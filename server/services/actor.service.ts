import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';
import db from '../database/models';
import { IActorDTO, IActorRepository } from '../repositories/IActor.repo';
import { IEventRepository } from '../repositories/IEvent.repo';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

const Actor: IActorRepository = db.Actor;
const Event: IEventRepository = db.Event;

/**
 * @class ActorServices
 */
export default class ActorServices implements Required<ActorServices> {
  /**
   * @author Akinlua
   * @method getActorServiceAsync
   * @desc Feature will add new actor
   * @returns {object} BaseResponse
   */
  getActorServiceAsync = async (): Promise<BaseResponse<IActorDTO[] | null>> => {
    try {
      const actors = ((await Event.findAll({
        include: [{ model: Actor, as: 'actor' }],
        attributes: ['actor_id', [sequelize.fn('COUNT', sequelize.col('actor_id')), 'total']],
        order: [
          [sequelize.literal('total'), 'DESC'],
          ['created_at', 'DESC'],
        ],
        group: ['Event.actor_id', 'actor.id', 'created_at'],
      })) as unknown) as { actor: IActorDTO }[];
      const returnValue = actors.map(
        ({ actor }): IActorDTO => ({ id: actor.id, avatar_url: actor.avatar_url, login: actor.login }),
      );
      return makeResponse(returnValue);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
  /**
   * @author Akinlua
   * @method updateActorServiceAsync
   * @desc Feature will add new actor
   * @returns {object} BaseResponse
   */
  updateActorServiceAsync = async (update: { id: number; avatar_url: string }): Promise<BaseResponse<any>> => {
    try {
      const existingActor = await Actor.findByPk(update.id);
      if (!existingActor) {
        return makeResponse(null, HttpStatusCode.NOT_FOUND, 'The actor does not exist');
      }
      await Actor.update({ avatar_url: update.avatar_url }, { where: { id: update.id } });
      return makeResponse(null);
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
  /**
   * @author Akinlua
   * @method updateActorServiceAsync
   * @desc Feature will add new actor
   * @returns {object} BaseResponse
   */
  getActorByStreakServiceAsync = async (): Promise<BaseResponse<IActorDTO[] | null>> => {
    try {
      const events = await db.sequelize.query(`
      ;WITH Streak AS(
        SELECT ROW_NUMBER() OVER (ORDER BY created_at) OverallID
          , ROW_NUMBER() OVER (PARTITION BY actor_id ORDER BY created_at) OrderID
          , (ROW_NUMBER() OVER (ORDER BY created_at) - ROW_NUMBER() OVER (PARTITION BY actor_id ORDER BY created_at)) IDDifference
          , * 
        FROM public."Events"
        inner join public."Actors" on "Events".actor_id = "Actors".id
      )
      SELECT ROW_NUMBER() OVER (PARTITION BY IDDifference ORDER BY created_at) Streak
      , created_at
        , actor_id
        FROM Streak
        group by actor_id, created_at, iddifference
        ORDER BY created_at;
        `);
      const actor_ids = events[0].map((event: { actor_id: any }) => event.actor_id);
      const actors = await Actor.findAll({ where: { id: { [Op.in]: actor_ids } } });
      return makeResponse(
        actors.map((actor): IActorDTO => ({ id: actor.id, login: actor.login, avatar_url: actor.avatar_url })),
      );
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
}

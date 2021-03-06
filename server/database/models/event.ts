import { DataTypes, Sequelize } from 'sequelize';
import { IEventModel, IEventRepository } from '../../repositories/IEvent.repo';

export default (sequelize: Sequelize): IEventRepository => {
  const Event = <IEventRepository>sequelize.define(
    'Event',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actor_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      repo_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {},
  );
  Event.associate = function (models: IEventModel | any) {
    Event.belongsTo(models.Actor, {
      foreignKey: 'actor_id',
      onDelete: 'CASCADE',
      as: 'actor',
    });
    Event.belongsTo(models.Repo, {
      foreignKey: 'repo_id',
      onDelete: 'CASCADE',
      as: 'repo',
    });
  };
  return Event;
};

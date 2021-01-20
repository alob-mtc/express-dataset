import { DataTypes, Sequelize } from 'sequelize';
import { IActorRepository, IActorModel } from '../../repositories/IActor.repo';

export default (sequelize: Sequelize): IActorRepository => {
  const Actor = <IActorRepository>sequelize.define(
    'Actor',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: false,
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
  Actor.associate = function (models: IActorModel | any) {
    Actor.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'actor',
      onDelete: 'CASCADE',
    });
  };
  return Actor;
};

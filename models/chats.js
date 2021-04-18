'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chats.belongsTo(models.Transactions,{
        foreignKey: 'transactionId'
      })
      Chats.belongsTo(models.Users,{
        foreignKey: 'userId'
      })
      Chats.belongsTo(models.Garages,{
        foreignKey: 'garageId'
      })
    }
  };
  Chats.init({
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Message cant be empty'
        },
        notNull: {
          args: true,
          msg: 'Message cant be empty'
        }
      }
    },
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};
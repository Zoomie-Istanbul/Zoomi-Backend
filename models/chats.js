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
    message: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};
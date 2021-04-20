'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserChats.hasMany(models.Chats,{
        foreignKey: 'userChatId'
      })
      UserChats.belongsTo(models.Users,{
        foreignKey: 'userId'
      })
      UserChats.belongsTo(models.Garages,{
        foreignKey: 'garageId'
      })
    }
  };
  UserChats.init({
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserChats',
  });
  return UserChats;
};
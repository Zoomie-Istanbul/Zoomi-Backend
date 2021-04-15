'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorites.belongsTo(models.Users,{
        foreignKey: 'userId'
      })
      Favorites.belongsTo(models.Garages,{
        foreignKey: 'garageId'
      })
    }
  };
  Favorites.init({
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};
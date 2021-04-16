'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Garages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Garages.hasMany(models.Items,{
        foreignKey: 'garageId'
      })
      Garages.hasMany(models.Favorites,{
        foreignKey: 'garageId'
      })
      Garages.belongsTo(models.Users,{
        foreignKey: 'userId'
      })
      Garages.hasMany(models.Transactions,{
        foreignKey: 'garageId'
      })
      Garages.hasMany(models.Chats,{
        foreignKey: 'garageId'
      })
    }
  };
  Garages.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cant be empty'
        },
        notNull: {
          args: true,
          msg: 'Name cant be empty'
        }
      }
    },
    status: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Address cant be empty'
        },
        notNull: {
          args: true,
          msg: 'Address cant be empty'
        }
      }
    },
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Garages',
  });
  return Garages;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.Garages,{
        foreignKey: 'garageId'
      })
      Items.hasMany(models.Orders,{
        foreignKey: 'itemId'
      })
    }
  };
  Items.init({
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
    price: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};
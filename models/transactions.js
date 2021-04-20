'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Garages,{
        foreignKey: 'garageId'
      })
      Transactions.belongsTo(models.Users,{
        foreignKey: 'userId'
      })
      Transactions.hasMany(models.Orders,{
        foreignKey: 'transactionId'
      })
      Transactions.hasOne(models.Reviews,{
        foreignKey: 'transactionId'
      })
    }
  };
  Transactions.init({
    date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.INTEGER,
    isReviewed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};
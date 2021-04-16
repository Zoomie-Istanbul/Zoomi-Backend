'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/passwordHelper.js')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Garages,{
        foreignKey: 'userId'
      })
      Users.hasMany(models.Transactions,{
        foreignKey: 'userId'
      })
      Users.hasMany(models.Chats,{
        foreignKey: 'userId'
      })
      Users.hasMany(models.Favorites,{
        foreignKey: 'userId'
      })
    }
  };
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'username is required'
        }
      }
    },
    password: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'username is required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'name is required'
        }
      }
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'roles is required'
        }
      }
    },
    image: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate : (data,opt) => {
        data.password = hash(data.password)
      }
    },
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
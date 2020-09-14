'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING, allowNull: false, unique: true,
      validate: {
        notNull: { args: true, msg: "Email cannot be empty." },
        isEmail: { args: true, msg: "Email is not in a correct email format." }
      }
    },
    password: {
      type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { args: true, msg: "Password must not be empty." },
        len: { args: [8, 255], msg: "Password must be at least 8 characters long." }
      }
    },
    role: {
      type: DataTypes.INTEGER, allowNull: false,
      validate: {
        notNull: { args: true, msg: "Role cannot be null." }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
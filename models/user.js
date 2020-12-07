'use strict';
const bcrypt = require('bcryptjs');
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
      User.hasOne(models.ShoppingCart)
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
        len: { args: [3, 255], msg: "Password must be at least 3 characters long." }
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

  User.addHook('beforeBulkCreate', (data) => {
    const salt = bcrypt.genSaltSync(10);
    if (Array.isArray(data)) {
      data.forEach((el) => {
        el.password = bcrypt.hashSync(el.password, salt);
      })
    } else {
      data.password = bcrypt.hashSync(data.password, salt);
    }
  })

  User.addHook('beforeCreate', (data) => {
    const salt = bcrypt.genSaltSync(10);
    if (Array.isArray(data)) {
      data.forEach((el) => {
        el.password = bcrypt.hashSync(el.password, salt);
      })
    } else {
      data.password = bcrypt.hashSync(data.password, salt);
    }
  })

  return User;
};
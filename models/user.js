'use strict';
const bcrypt = require(`bcryptjs`)

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
    name:DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email is already exist'
      },
      validate: {
        notEmpty:{
          msg: 'Enter your email to register',
        },
        notNull: {
          msg: 'Enter your email to register'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    isAdmin: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((userInstance)=>{
    const salt = bcrypt.genSaltSync(10);
    userInstance.password = bcrypt.hashSync(userInstance.password, salt);

    userInstance.isAdmin = false

  })
  return User;
};
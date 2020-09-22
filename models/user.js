'use strict';
const bcrypt = require('bcryptjs')
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
      User.hasOne(models.Cart)
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
           args: true,
           msg: "Name Cannot be empty"
         }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        is: {
          args: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          msg: "Email Invalid"
        },
        notNull: {
           args: true,
           msg: "Email Cannot be empty"
         }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
           args: true,
           msg: "password Cannot be empty"
         }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate:(user,options) =>{
        user.role = 'user'
        try{
          const salt = bcrypt.genSaltSync(10)
          user.password = bcrypt.hashSync(user.password,salt)
        }
        catch(err){
          console.log(err)
        }
      }
    },
    sequelize,
    modelName: 'User',

  });
  return User;
};

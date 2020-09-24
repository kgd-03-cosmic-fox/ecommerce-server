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
    email: {
      type : DataTypes.STRING,
      unique : {
        args: true,
        msg: 'Email address already in use!'
      },
      validate : {
        isEmail : {
          args : true,
          msg : 'Email must be email format'
        }
      }
     
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        len : {
          args : [4, 15] ,
          msg : 'Password must be 4-15 length'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks :{
      beforeCreate(instance){
  
        if(!instance.role){
          instance.role = 'customer'
        }
        
        const salt = bcrypt.genSaltSync(10);
        instance.password = bcrypt.hashSync(instance.password, salt);



      }
    }
  });
  return User;
};
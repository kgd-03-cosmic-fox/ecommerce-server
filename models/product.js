'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Product's name is required"
        },
        notNull:{
          args:true,
          msg:"Product's name is required"
        },
        isString(value){
          if(typeof value !== "string"){
            throw new Error("Wrong data types input, type of Product Name must be string")
          }
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Product's price is required"
        },
        notNull:{
          args:true,
          msg:"Product's price is required"
        },
        min:{
          args: [0],
          msg:"Price can't be under 0"
        },
        isNumber(value){
          if(typeof value !== "number"){
            throw new Error("Wrong data types input, type of Price must be number")
          }
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Stock amount is required"
        },
        notNull:{
          args:true,
          msg:"Stock amount is required"
        },
        min:{
          args:[0],
          msg:"Stock can't be under 0"
        },
        isNumber(value){
          if(typeof value !== "number"){
            throw new Error("Wrong data types input, type of Stock must be number")
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
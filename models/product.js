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
      Product.hasMany(models.CartProduct)
    }
  };
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Item Name Cannot be leave empty'
        },
        notNull:{
          args:true,
          msg:'Item Name Cannot be leave empty'
        },
        isNotString(value){
          if(typeof value !== 'string'){
            throw new Error("Invalid value of DataTypes name");
          }
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Url Cannot be leave empty'
        },
        notNull:{
          args:true,
          msg:'Url Cannot be leave empty'
        },
        isNotString(value){
          if(typeof value !== 'string'){
            throw new Error("Invalid value of DataTypes url");
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
          msg:'Item Price Cannot be leave empty'
        },
        notNull:{
          args:true,
          msg:'Item Price Cannot be leave empty'
        },
        isInt:{
          args:[true],
          msg: 'Invalid DataTypes of price'
        },
        min:{
          args:[0],
          msg:'Price cannot be filled with negative numbers'
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Item stock Cannot be leave empty'
        },
        notNull:{
          args:true,
          msg:'Item stock Cannot be leave empty'
        },
        isInt:{
          args:[true],
          msg: 'Invalid DataTypes of stock'
        },
        min:{
          args:[0],
          msg:'Stock cannot be filled with negative numbers'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

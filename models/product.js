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
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "all content cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "all content cannot be empty"
        }
      }
    },
    image_url: {
      type :  DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "all content cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "all content cannot be empty"
        },
        isUrlOrNot(value){

          let flagStartUrl = false
          let flagEndUrl = false
          let http = ['http://' , 'https://']
          let imgExt = ['.png' , '.jpg' , '.jpeg']

          let baseUrl = ''
          for(let i = 0 ; i < 9 ; i++){
            baseUrl += value[i]
            for(let j = 0 ; j < http.length ; j++){
              if(baseUrl == http[j]){
                flagStartUrl = true
              }
            }
          }

          let endUrl = ''
          for(let k = value.length - 1 ; k > value.length - 6 ; k--){
            endUrl += value[k]
            for(let l = 0 ; l < imgExt.length ; l++){

              if(endUrl.split("").reverse().join("").toLowerCase() == imgExt[l]){
                flagEndUrl = true
              }
            }
          }


          if(!flagStartUrl || !flagEndUrl){
            throw new Error("img_url must be url")
          }

        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "all content cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "all content cannot be empty"
        },
        isNumeric : {
          args : true,
          msg : 'price / stock cannot less than 0 and numbers only'
        },
        min : {
          args : [0],
          msg :'price / stock cannot less than 0 and numbers only'
        }
      }
      
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "all content cannot be empty"
        },
        notEmpty : {
          args : true,
          msg : "all content cannot be empty"
        },
        isNumeric : {
          args : true,
          msg : 'price / stock cannot less than 0 and numbers only'
        },
        min : {
          args : [0],
          msg :'price / stock cannot less than 0 and numbers only'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
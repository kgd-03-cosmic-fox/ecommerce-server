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
      type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { args: true, msg: "Product Name length must be between 3 to 255 characters long." },
        len: { args: [3, 255], msg: "Product Name length must be between 3 to 255 characters long." }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [0, 255], msg: "Image URL cannot be longer than 255 characters." }
      }
    },
    price: {
      type: DataTypes.DECIMAL, allowNull: false,
      validate: {
        notNull: { args: true, msg: "Price cannot be empty." },
        isNumeric: { args: true, msg: "Price must be a number." },
        min: { args: [0], msg: "Price must be a positive number." }
      }
    },
    stock: {
      type: DataTypes.INTEGER, allowNull: false,
      validate: {
        notNull: { args: true, msg: "Stock cannot be empty." },
        isNumeric: { args: true, msg: "Stock must be a number." },
        isInt: { args: true, msg: "Stock cannot be decimal." },
        min: { args: [0], msg: "Stock must be a positive number." }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartProduct.belongsTo(models.Cart)
      CartProduct.belongsTo(models.Product)
    }
  };
  CartProduct.init({
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: {
      type: DataTypes,
      allowNull: false,
      validate:{
        min: {
          args: [1],
          msg: 'Amount minimum is 1'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};
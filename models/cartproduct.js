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
      CartProduct.belongsTo(models.ShoppingCart)
      CartProduct.belongsTo(models.Product)
    }
  };
  CartProduct.init({
    ShoppingCartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.INTEGER, allowNull: false,
      validate: {
        notNull: { args: true, msg: `Invalid amount.` },
        isInt: { args: true, msg: `Invalid amount.` },
        min: { args: [1], msg: `Invalid amount.` }
      }
    },
    status: {
      type: DataTypes.INTEGER, allowNull: false,
      validate: {
        notNull: { args: true, msg: `Invalid Status.` }
      }
    }
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};
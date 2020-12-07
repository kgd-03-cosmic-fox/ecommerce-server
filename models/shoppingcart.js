'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingCart.belongsToMany(models.Product, { through: models.CartProduct })
      ShoppingCart.hasMany(models.CartProduct)
      ShoppingCart.belongsTo(models.User)
    }
  };
  ShoppingCart.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};
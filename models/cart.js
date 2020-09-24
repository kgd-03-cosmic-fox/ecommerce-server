'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.hasMany(models.ProductCart)
      Cart.hasMany(models.Transaction)
      Cart.belongsToMany(models.Product, {through: models.ProductCart})
      Cart.belongsToMany(models.Product, {through: models.Transaction})
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
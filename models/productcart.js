'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCart.belongsTo(models.Product)
      ProductCart.belongsTo(models.Cart)
    }
  };
  ProductCart.init({
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'must have value >= 0'
        },
        isNumeric: {
          args: true,
          msg: 'only value number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ProductCart',
  });
  return ProductCart;
};
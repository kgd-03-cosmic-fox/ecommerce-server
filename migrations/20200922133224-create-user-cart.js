'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCarts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CartId: {
        type: Sequelize.INTEGER,
        references: {
          models: 'Carts',
          key: 'id'
        }
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          models: 'Products',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserCarts');
  }
};
'use strict';
const { User } = require('../models/index.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await User.bulkCreate([{
      email: "budi@mail.com",
      password: "asdasd",
      role: 0
    },
    {
      email: "admin@mail.com",
      password: "1234",
      role: 1
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await User.destroy({ where: {}, truncate: true });
  }
};

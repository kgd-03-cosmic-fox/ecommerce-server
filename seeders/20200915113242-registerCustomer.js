'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

   let userCust = {
    email : 'test@email.com',
    password : '1234',
    role : 'customer',
    createdAt : new Date(),
    updatedAt : new Date()
  }

  const salt = bcrypt.genSaltSync(10);
  userCust.password = bcrypt.hashSync(userCust.password, salt);

  return queryInterface.bulkInsert( 'Users', [userCust] ,{})

  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete( 'Users', null ,{})
  }
};

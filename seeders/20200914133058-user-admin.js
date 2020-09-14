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
    let userAdmin = {
      email : 'admin@email.com',
      password : '1234',
      role : 'admin',
      createdAt : new Date(),
      updatedAt : new Date()
    }

    const salt = bcrypt.genSaltSync(10);
    userAdmin.password = bcrypt.hashSync(userAdmin.password, salt);

    return queryInterface.bulkInsert( 'Users', [userAdmin] ,{})

  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete( 'Users', null ,{})
  }
};

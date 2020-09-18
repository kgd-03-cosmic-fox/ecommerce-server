'use strict';
const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./dataProduct.json' , 'utf-8'))

data.forEach(el=>{
  el.createdAt = new Date()
  el.updatedAt = new Date()
})
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

    return queryInterface.bulkInsert('Products' , data , {})
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('Products', null, {})
  }
};

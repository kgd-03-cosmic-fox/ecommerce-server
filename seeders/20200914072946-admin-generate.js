'use strict';
const bcrypt = require('bcryptjs')
let data = [
  {
    name:"admin",
    email:"admin@mail.com",
    password:"1234",
    role:"admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name:"user",
    email:"user@mail.com",
    password:"4321",
    role:"user",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
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
    try{
      const salt = bcrypt.genSaltSync(10)
      data.forEach((el) =>{
        return el.password = bcrypt.hashSync(el.password,salt)
      })
      await queryInterface.bulkInsert('Users', data, {})
    }
    catch(err){
      console.log(err)
    }

  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};

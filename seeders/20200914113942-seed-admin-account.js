'use strict';
const bcrypt = require(`bcrypt`)

let admins= [
  {
  name:"Rafael",
  email:"raf@gmail.com",
  isAdmin:true,
  password:"1234"
  },
  {
    name:"Dhimas",
    email:"dhimas@gmail.com",
    isAdmin:true,
    password:"1234"
  }
]
const salt = bcrypt.genSaltSync(10);

admins = admins.map((element)=>{
 element.password =  bcrypt.hashSync(element.password, salt);
  element.createdAt = new Date()
  element.updatedAt = new Date ()
 return element
})

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
   queryInterface.bulkInsert(`Users`,admins,{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   queryInterface.bulkDelete(`Users`,null,{})

  }
};

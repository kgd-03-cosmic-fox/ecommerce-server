'use strict';

const fs = require(`fs`);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise ((resolve,reject)=>{
      fs.readFile(`./product-list/products.json`,'utf8',(err,data)=>{
        if(err){
          reject(err)
        }
        else{
          resolve(data)
        }
      })
    })
      .then((products)=>{
        let readProducts = JSON.parse(products)

        let productsArray = readProducts.map((element)=>{
          return {
            name: element.name,
            price: element.price,
            stock: element.stock,
            category: element.category,
            imgUrl: element.imgUrl,
            createdAt: new Date (),
            updatedAt: new Date ()
          }
        })
        return queryInterface.bulkInsert('Products',productsArray,{})
      })
      .catch((err)=>{
        console.log(err)
      })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products',null,{})

  }
};

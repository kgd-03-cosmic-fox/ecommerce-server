const { Product } = require(`../models`)

class categoryController {
  static getProductByCategory (req, res, next) {
    Product.findAll({
      where:{
        category: req.params.category
      }
    })
    .then(products=>{
      res.status(200).json({
        products
      })
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = categoryController
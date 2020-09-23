const { CartProduct, Product, Cart } = require(`../models`)

class CartController {
  static postCart (req,res,next) {
    CartProduct.findOne({
      where: {
        ProductId: req.params.productId
      }
    })
    .then(data => {
      if(!data){
        Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        .then(product => {
          if(product){
            if (Number(req.body.amount) <= Number(product.stock)){
              return CartProduct.create({
                CartId: req.loggedInUser.CartId,
                ProductId: req.params.productId,
                amount: req.body.amount
              })
              .then(_ => {
                res.status(200).json({
                  message: "Success adding product to shopping",
                })
              })
              .catch(err => {
                next(err)
              })
            } else {
              res.status(400).json({
                error: `Stock limit is reached`,
                name: product.name,
                stock: product.stock
              })
            }
          } else{
            res.status(404).json({
              error: 'Not found error: 404'
            })
          }
        })
      }
      else{
        Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        .then(product => {
          if ((Number(product.amount) + Number(req.body.amount)) <= Number(product.stock)){
            return CartProduct.update({
              amount: Number(product.amount) + Number(req.body.amount)
            },{
              where:{
                ProductId: req.params.productId
              }
            })
            .then(_ => {
              res.status(200).json({
                message: "Success adding product to shopping",
              })
            })
            .catch(err => {
              next(err)
            })
          }
          else {
            res.status(400).json({
              message: `Stock limit is reached`,
              name: product.name,
              stock: product.stock
            })
          }
        })
      }
    })
    .catch(err=>{
      next(err)
    })
  }
  static getCart (req,res,next) {
    CartProduct.findAll({
      include:[Product]
    })
    .then(cartProduct=>{
      if(cartProduct.length==0){
        res.status(404).json({
          message: "Your shopping cart is empty"
        })
      } else{

        res.status(200).json({
          cartProduct
        })
      }
    })
    .catch(err=>{
      next(err)
    })
    }
  static patchCart (req,res,next) {

  }
  static deleteCart (req,res,next) {
    CartProduct.findOne({
      where:{
        id: req.params.cartProductId
      }
    })
    .then(cartProduct=>{
      if(cartProduct){
        return CartProduct.destroy({
          where: {
            id: req.params.cartProductId
          }
        })
      } else{
        res.status(404).json({
          error: "Not found error: 404"
        })
      }
    })
    .then(_ => {
      res.status(200).json({
        message: "Success deleting product in shopping cart"
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController
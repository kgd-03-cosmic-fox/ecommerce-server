const { Cart,CartProduct,Product } = require('../models')
class CartProductController {
  static getCartProduct (req,res,next) {
    Cart.findOne({
      where: {
        UserId: req.loggedInUser.id
      }
    })
    .then(cart => {
      CartProduct.findAll({
          where: {
            CartId: cart.id
          },
          include: Product
        })
        .then(data =>{
          res.status(200).json(data)
        })
    })
    .catch(err =>{
      console.log(err)
      next(err)
    })
  }
  static getCartProductById (req,res,next) {
    Cart.findOne({
      where: {
        UserId: req.loggedInUser.id
      }
    })
    .then(cart => {
      CartProduct.findOne({
          where: {
            id: req.params.id,
            CartId: cart.id
          },
          include: Product
        })
        .then(data =>{
          res.status(200).json(data)
        })
    })
    .catch(err =>{
      console.log(err)
      next(err)
    })
  }
  static postCartProduct (req,res,next) {
    Cart.findOne({
      where: {
        UserId: req.loggedInUser.id
      }
    })
    .then(cart => {
      CartProduct.create({
        CartId: cart.id,
        ProductId: req.params.productId,
        ammount: req.body.ammount
      })
      .then(data => {
        res.status(200).json({
          message: 'Cart Has Been Added'
        })
      })
    })
    .catch(err => {
      console.log('err')
      next(err)
    })
  }
  static deleteCartProduct (req,res,next) {
    CartProduct.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.status(200).json({
        message: 'Item Has Been Deleted'
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
  static patchCartProduct (req,res,next) {
    CartProduct.update({
      ammount: req.body.ammount
    },{
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.status(200).json({
        message: 'Cart Has Been Updated'
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}
module.exports = CartProductController

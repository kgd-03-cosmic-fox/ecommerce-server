const { Cart,CartProduct,Product } = require('../models')
class CartProductController {
  static getCartProduct (req,res,next) {
    Cart.findOne({
      where: {
        UserId: req.loggedInUser.id
      }
    })
    .then(cart => {
      return CartProduct.findAll({
          where: {
            CartId: cart.id
          },
          attributes: {
            exclude: ['createdAt','updatedAt']
          },
          include: Product
        })
    })
    .then(data =>{
      res.status(200).json(data)
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
      return CartProduct.findOne({
          where: {
            id: req.params.id,
            CartId: cart.id
          },
          include: Product
        })
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err =>{
      console.log(err)
      next(err)
    })
  }
  static postCartProduct (req,res,next) {
    let cartData;
    let productStock;
    console.log('Ini productId param ' + req.params.productId)
    Cart.findOne({
      where: {
        UserId: req.loggedInUser.id
      }
    })
    .then(cart => {
      return CartProduct.findOne({
        where: {
          ProductId: req.params.productId,
          CartId: cart.id
        }
      })
    })
    .then(cartProduct => {
      cartData = cartProduct
      if(!cartData) {
        Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        .then(product => {
          if(product.stock < req.body.ammount) {
            res.status(500).json({
              message: 'Out of Range Ammount Number'
            })
          }
          else {
            Cart.findOne({
              where: {
                UserId: req.loggedInUser.id
              }
            })
            .then(cart => {
              return CartProduct.create({
                CartId: cart.id,
                ProductId: req.params.productId,
                ammount: req.body.ammount
              })
            })
            .then(cartProduct => {
              res.status(200).json({
                message: 'Product Has Been Added to Your Cart'
              })
            })
            .catch(err => {
              console.log(err)
              next(err)
            })
          }
        })
        .catch(err => {
          console.log(err)
          next(err)
        })
      } else {
        Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        .then(productData => {
          productStock = productData
          if(Number(productStock.stock) < (Number(cartData.ammount) + Number(req.body.ammount))) {
            res.status(500).json({
              message: 'Out of Range Ammount Number'
            })
          }
          else {
            CartProduct.update({
              ammount: `${Number(cartData.ammount) + Number(req.body.ammount)}`
            },{
              where: {
                ProductId: req.params.productId
              }
            })
            .then(update => {
              res.status(200).json({
                message: 'Product Amount on Your Cart Has Been Updated'
              })
            })
            .catch(err => {
              console.log('error on '+err)
              next(err)
            })
          }
        })
        .catch(err =>{
          console.log(err)
          next(err)
        })
      }
    })
    .catch(err => {
      console.log(err)
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
    let cartProductData;
    CartProduct.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(cartData => {
      cartProductData = cartData;
      return Product.findOne({
        where: {
          id: cartProductData.ProductId
        }
      })
    })
    .then(product => {
      if(product.stock < req.body.ammount) {
        res.status(500).json({
          message: 'Invalid Ammount Number'
        })
      }
      else {
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
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}
module.exports = CartProductController

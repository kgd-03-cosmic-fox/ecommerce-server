const { CartProduct, Product } = require(`../models`)

class CartController {
  static postCart (req,res,next) {
    CartProduct.findOne({
      where: {
        CartId: req.loggedInUser.CartId,
        ProductId: req.params.productId
      },
      include: [Product]
    })
    .then(cartProduct => {
      if (cartProduct) {
        console.log(cartProduct.Product.stock)
        console.log(Number(req.body.amount))
        console.log(Number(req.body.amount))
        if( cartProduct.Product.stock >= (Number(req.body.amount) + Number(cartProduct.amount))) {
          console.log('terpanggil')
          cartProduct.update({
            amount: Number(req.body.amount) + Number(cartProduct.amount)
          },{
            where: {
              cartProduct: req.loggedInUser.CartId,
              ProductId: req.params.productId
            }
          })
          .then(cartProduct => {
            res.status(200).json({
              message: "Success adding product to shopping cart",
              cartProduct
            })
          })
          .catch(err=>{
            next(err)
          })
        } else {
          res.status(400).json({
            message: "Maximum quantity reached"
          })
        }
      } else {
        Product.findOne({
          where: {
            id: req.params.productId
          }
        })
        .then(product => {
          if(Number(product.stock) >= Number(req.body.amount)) {
            CartProduct.create({
              ProductId: req.params.productId,
              CartId: req.loggedInUser.CartId,
              amount: req.body.amount
            })
            .then(cartProduct=>{
              res.send(cartProduct)
            })
            .catch(err=>{
              next(err)
            })
          } else {
            res.status(400).json({
              message: "Maximum quantity reached"
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
    console.log(req.loggedInUser.CartId)
    CartProduct.findAll({
      where:{
          CartId: Number(req.loggedInUser.CartId)
        },
        order: [['id', 'ASC']],
      include: Product
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
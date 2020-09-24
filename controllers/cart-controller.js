const {Cart, ProductCart, Product, Transaction} = require('../models')


class CartController {

  static getCartList (req, res, next) {
    
    Cart.findOne({
      where: {
        UserId : req.isLoggedIn.id
      }
    })
    .then(data => {
      return ProductCart.findAll({
        where : {
          CartId : data.id
        },
        include: Product,
        attributes: ['id' , 'CartId' , 'ProductId', 'amount']
      })
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static addCartList (req, res, next) {
    let cartId
    let prodId
    let totalAmount
    let stockProd
    Cart.findOne({
      where: {
        UserId : req.isLoggedIn.id
      }
    })
    .then(data => {
      cartId = data.id
      return Product.findOne({
        where : {
          id : req.params.prodId
        }
      })
    })
    .then(data => {
        
      if(data){
        prodId = data.id
        stockProd = data.stock
        if(req.body.amount <= stockProd) {

          return ProductCart.findOne({
            where: {
              CartId : cartId,
              ProductId : prodId
            }
          })
          .then(data => {

            if(data){
              totalAmount = Number(req.body.amount) + data.amount
              
              if( totalAmount <= stockProd) {
                return ProductCart.update({
                  amount: totalAmount
                },{
                  where: {
                    CartId : cartId,
                    ProductId : prodId 
                  }
                })
              } else {
                next({status: 400, message: 'Sorry, Quota Not Enough'})
              }
             
            } else {
              totalAmount = req.body.amount
              return ProductCart.create({
                CartId: cartId,
                ProductId: prodId,
                amount : totalAmount
              })
             
            }
          })
          .then(data => {
            res.status(200).json({message: 'Product has been added into your Cart List!'})
          })

        } else {
          next({status: 400, message: 'Sorry, Quota Not Enough'})
        }
          
      } else {
        next({status: 404, message: 'Sorry, Product Is Not Found'})
      }
    })
    .catch(next)
  }

  static updateCartList (req, res, next) {
    let stockProd
    
    ProductCart.findOne({
      where: {
        id: req.params.prodCartId
      },
      include: Product
    })
    .then(data => {
      stockProd = data.Product.stock

      if(data){

        if(req.body.amount <= stockProd) {
          return ProductCart.update({
            amount: req.body.amount
          },{
            where: {
              id: req.params.prodCartId
            }
          })
          .then(data => {
            res.status(200).json({message: 'Your Cart has been Updated'})
          })

        } else {
          next({status: 400, message: 'Sorry, Quota Not Enough'})
        }
      }

      else{
        next({status: 404, message: 'Please add Product into your Cart first'})
      }
    })
    .catch(next)

  }

  static deleteProdCartList (req, res, next){

      ProductCart.destroy({
        where: {
          id: req.params.prodCartId 
        }
      })
      .then(data => {
        res.status(200).json({message: 'Your Cart has been deleted'})
      })
      .catch(next)
    
  }

  static deleteMyCartList (req, res, next){

    let cartId

    Cart.findOne({
      where : {
        UserId: req.isLoggedIn.id
      }
    })
    .then(data => {
      
      if (data){
        cartId = data.id

        return ProductCart.destroy({
          where: {
            CartId: cartId
          }
        })
        .then(data => {
          res.status(200).json({message: 'Your Carts has been deleted'})
        })

      } else {
        next({status: 404, message: 'Sorry Please contact our services'})
      }

    })
    .catch(next)

  }

}

module.exports = CartController
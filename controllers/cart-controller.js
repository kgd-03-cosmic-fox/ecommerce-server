const {Cart, UserCart, Product, Transaction} = require('../models')


class CartController {

  static getCartList (req, res, next) {
    
    Cart.findOne({
      where: {
        UserId : req.isLoggedIn.id
      }
    })
    .then(data => {
      return UserCart.findAll({
        where : {
          CartId : data.id
        },
        include: Product
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
      prodId = data.id
      stockProd = data.stock

      if(data){
        if(req.body.amount <= data.amount){

          return UserCart.findOne({
            where: {
              CartId : cartId,
              ProductId : prodId 
            }
          })
          .then(data => {

            if(data){
              totalAmount = req.body.amount + data.amount
              stockProd = stockProd - totalAmount
              return UserCart.update({
                amount: totalAmount
              },{
                where: {
                  CartId : cartId,
                  ProductId : prodId 
                }
              })
      
            } else {
              totalAmount = req.body.amount
              stockProd = stockProd - totalAmount
              return UserCart.create({
                CartId: cartId,
                ProductId: prodId,
                amount : req.body.amount
              })
            }
          })
          .then(data => {
      
            return Product.update({
              amount: totalAmount
            },{
              where: {
                id: prodId
              }
            })
      
          })
          .then(data => {
            res.status(200).json({message: 'Product has been added into your Cart List!'})
          })

        } else {
          next({status: 400, message: 'Sorry, Our Quota is not enough'})
        }
      } else {
        next({status: 404, message: 'Sorry, Product Is Not Found'})
      }
    })
    .catch(next)
  }

  static updateCartList (req, res, next) {
    let cartId

    Cart.findOne({
      where : {
        UserId: req.isLoggedIn.id
      }
    })
    .then(data => {
      
      if (data){
        cartId = data.id

        return UserCart.update({
          amount: req.body.amount
        },{
          where: {
            CartId: cartId,
            ProductId: req.params.prodId 
          }
        })
        .then(data => {
          res.status(200).json({message: 'Your Cart has been Updated'})
        })

      } else {
        next({status: 404, message: 'Sorry Please contact our services'})
      }

    })
    .catch(next)
  
  }

  static deleteProdCartList (req, res, next){

    let cartId

    Cart.findOne({
      where : {
        UserId: req.isLoggedIn.id
      }
    })
    .then(data => {
      
      if (data){
        cartId = data.id

        return UserCart.destroy({
          where: {
            CartId: cartId,
            ProductId: req.params.prodId 
          }
        })
        .then(data => {
          res.status(200).json({message: 'Your Cart has been deleted'})
        })

      } else {
        next({status: 404, message: 'Sorry Please contact our services'})
      }

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

        return UserCart.destroy({
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

  static buyInCart (req, res, next) {

     let cartId

    Cart.findOne({
      where : {
        UserId: req.isLoggedIn.id
      }
    })
    .then(data => {
      
      if (data){
        cartId = data.id

        return UserCart.findAll({
          where: {
            CartId: cartId
          }
        })
        .then(data => {
          
          if(data.length === 0){
            next({status: 404, message: "You don't have anything in your Cart"})
          } else {

            Transaction.bulkCreate(data)
            .then(data => {
              
              return UserCart.destroy({
                where: {
                  CartId: cartId
                }
              })
              .then(data => {
                res.status(200).json({message: 'Thanks for your purchasing'})
              })
            })
 
          }
        })

      } else {
        next({status: 404, message: 'Sorry Please contact our services'})
      }

    })
    .catch(next)
  }
 
}

module.exports = CartController
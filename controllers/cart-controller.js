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
        
      if(data){
        prodId = data.id
        stockProd = data.stock
        if(req.body.amount <= stockProd) {

          return UserCart.findOne({
            where: {
              CartId : cartId,
              ProductId : prodId
            },
            // include {
            //   product
            // }
          })
          .then(data => {

            if(data){
              totalAmount = Number(req.body.amount) + data.amount
              
              if( totalAmount <= stockProd) {
                return UserCart.update({
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
              return UserCart.create({
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
    let cartId
    let stockProd

    Cart.findOne({
      where : {
        UserId: req.isLoggedIn.id
      }
    })
    .then(data => {
      
      if (data){
        cartId = data.id

        return Product.findOne({
          where: {
            id: req.params.prodId
          }
        })
        .then(data => {
          stockProd = data.stock

          return UserCart.findOne({
            where: {
              CartId : cartId,
              ProductId : req.params.prodId
            }
          })
          .then(data => {

            if(data){

              if(req.body.amount <= stockProd) {
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
                next({status: 400, message: 'Sorry, Quota Not Enough'})
              }
            }

            else{
              next({status: 404, message: 'Please add Product into your Cart first'})
            }
          })

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
    // Not finished, will try to change again after client finish
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
          },
          exclude: ['createdAt', 'updatedAt']
        })
        .then(data => {
          console.log(data)
          if(data.length === 0){
            next({status: 404, message: "You don't have anything in your Cart"})
          } else {
            res.status(200).json(data)

            // return Transaction.bulkCreate(data)
            // .then(data => {
              
            //   return UserCart.destroy({
            //     where: {
            //       CartId: cartId
            //     }
            //   })
            //   .then(data => {
            //     res.status(200).json({message: 'Thanks for your purchasing'})
            //   })
            // })
 
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
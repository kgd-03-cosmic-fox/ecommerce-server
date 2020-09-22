const { User,Cart,CartProduct } = require('../models')
const jwt = require('jsonwebtoken')
function authorizationUser(req,res,next){
  try{
    Cart.findOne({
      where: {
        UserId: req.loggedInUser.id
      }
    })
    .then(cart => {
      return CartProduct.findOne({
        where: {
          CartId: cart.id
        }
      })
      .then(cartProduct => {
        if(cartProduct) {
          next()
        }
        else {
          res.status(401).json({
            message: 'Access Denied'
          })
        }
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}
module.exports = authorizationUser

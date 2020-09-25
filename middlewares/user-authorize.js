const { User,Cart,CartProduct } = require('../models')
const jwt = require('jsonwebtoken')
function authorizationUser(req,res,next){
    let cartId;
    CartProduct.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(cartProduct => {
      cartId = cartProduct.CartId
      return Cart.findOne({
        where: {
          UserId: req.loggedInUser.id
        }
      })
      .then(cart => {
        if(cart.id == cartId) {
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
module.exports = authorizationUser

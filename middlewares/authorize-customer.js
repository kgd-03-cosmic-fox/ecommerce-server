const {User, Cart, ProductCart} = require('../models')

function authorizationCustomer (req, res, next) {
  let cartId
  User.findOne({
    where: {
      id: req.isLoggedIn.id
    },
    include: [Cart]
  })
  .then(data => {
    
    cartId = data.Cart.id
    return ProductCart.findOne({
      where: {
        id : req.params.prodCartId
      }
    })
  })
  .then(data => {

    if(data.CartId != cartId){
      next({status: 401, message: 'Not Authorize'})
    } else {
      next()
    }
  })
  .catch(next)
}

module.exports = authorizationCustomer
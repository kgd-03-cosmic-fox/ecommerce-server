const { Cart } = require(`../models`)

function customerAuthorization (req,res,next) {
  Cart.findOne({
    where: {
      UserId: req.loggedInUser.id
    }
  })
  .then(cart => {
    if (cart) {
      req.loggedInUser.CartId = cart.id
      next()
    } else {
      res.status(404).json({
        message: 'Not found error'
      })
    }
  })
  .catch(_=>{
    res.status(400).json({
      message: "Unauthorized"
    })
  })
}

module.exports = customerAuthorization
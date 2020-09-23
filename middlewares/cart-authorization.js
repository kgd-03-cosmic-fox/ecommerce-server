const { CartProduct, ShoppingCart } = require('../models/index.js');

//this authorization is for endpoints that calls CartProductId directly
//it is to verify that the CartProduct edited/deleted is really owned by the user logged in
async function cartAuthorization(req, res, next) {
  try {
    let cartItem = await CartProduct.findOne({
      where: { id: req.params.cartProductId }
    })
    let cart = await ShoppingCart.findOne({ where: { id: cartItem.ShoppingCartId } })
    if (cart === null) {
      res.status(401).json({ message: "Unauthorized." })
    } else {
      if (cart.UserId === req.tokenPayload.id) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized." })
      }
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized." })
  }
}

module.exports = cartAuthorization;
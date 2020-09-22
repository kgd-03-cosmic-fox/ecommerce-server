const { Product, CartProduct, ShoppingCart } = require('../models/index.js');

class ShoppingCartController {

  static generateShoppingCart(data) {
    return ShoppingCart.create({ UserId: data.id })
  }

  static fetchCartContentGetHandler(req, res, next) {  //fetch CartProduct with CartId of User stored in header
    ShoppingCart.findOne({
      where: { UserId: req.tokenPayload.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] }, //get card ID associated with the user
      include: [{
        model: CartProduct, where: { status: 0 }, //status 0 = unprocessed, status 1 = purchased
        include: [{
          model: Product,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }]  //want to test this way (nested queries) first; would be nice if possible
      }] //expected output: ShoppingCart.CartProduct = array of CartProduct, with .Product
    })  //if this did not work, will just do queries 1 by 1 later
      .then((data) => {
        res.status(200).json(data); //untested btw, will test tomorrow after "addToCart" is added
      })
      .catch((err) => {
        next(err);
      })
  }

  static addToCartPostHandler(req, res, next) {  // params: ProductId ; add ProductId item to CartProduct

  }

  static editCartItemQuantityPatchHandler(req, res, next) { //params: cartProductId, 
    CartProduct.findByPk(req.params.cartProductId, { include: Product })
      .then((data) => {
        if (req.body.amount > data.Product.stock) { //if amount is bigger than stock, make amount same as stock
          req.body.amount = data.Product.stock;   //still undecided whether doing this or throw err
        } else {
          return CartProduct.update({ Amount: req.body.amount }, //requires req.body.amount type of Integer
            { where: { id: req.params.cartProductId } })
        }
      })
      .then((data) => {
        res.status(200).json({ message: "Update Successful!" })
      })
      .catch((err) => {
        next(err);
      })
  }

  static removeFromCartDeleteHandler(req, res, next) { //params: cartProductId for now
    CartProduct.findByPk(req.params.cartProductId, {})
      .then((result) => {
        res.status(200).json({ message: "Delete successful." });
      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = ShoppingCartController;
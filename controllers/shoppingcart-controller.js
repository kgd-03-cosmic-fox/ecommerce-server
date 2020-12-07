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
        attributes: { include: ['id'] }, //ducttape fix lul.
        //somehow sequelize thinks ShoppingCartId is the PK and acts like id didnt exist when not specifying.
        //actual PK is still the id, it's just the fetch queries seems to didnt think so.
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

  static async addToCartPostHandler(req, res, next) {
    try {
      req.body.amount = Number(req.body.amount)
      let cartInfo = await ShoppingCart.findOne({ where: { UserId: req.tokenPayload.id } });
      if (cartInfo === null) {
        cartInfo = await ShoppingCartController.generateShoppingCart(req.tokenPayload);
      }

      let dupecheck = await CartProduct.findOne({
        attributes: { include: ['id', 'amount'] },
        where: { ShoppingCartId: cartInfo.id, ProductId: Number(req.params.productId), status: 0 }
      });

      let currentItem = await Product.findOne({ where: { id: req.params.productId } })

      if (dupecheck === null) {
        if (req.body.amount > currentItem.stock) {
          req.body.amount = currentItem.stock; //change amount to equal current stock if amount is bigger
        }
        let data = await CartProduct.create({
          ShoppingCartId: cartInfo.id,
          ProductId: req.params.productId,
          amount: Number(req.body.amount),
          status: 0
        })
        res.status(200).json(data);
      }
      else {
        req.body.amount += dupecheck.amount;
        if (req.body.amount > currentItem.stock) {
          req.body.amount = currentItem.stock; //change amount to equal current stock if amount is bigger
        }
        let data = await CartProduct.update({
          amount: Number(req.body.amount)
        }, { where: { id: dupecheck.id } })
        res.status(200).json({ message: `Successfully updated the cart!` });
      }

    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static editCartItemQuantityPatchHandler(req, res, next) { //params: cartProductId, 
    req.body.amount = Number(req.body.amount)
    CartProduct.findOne({ where: { id: req.params.cartProductId }, include: Product })
      .then((data) => {
        if (req.body.amount > data.Product.stock) { //if amount is bigger than stock, make amount same as stock
          return CartProduct.update({ amount: data.Product.stock },
            { where: { id: req.params.cartProductId } })
        } else {
          return CartProduct.update({ amount: req.body.amount },
            { where: { id: req.params.cartProductId } })
        }
      })
      .then((data) => {
        res.status(200).json({ message: `Successfully updated the cart!` });
      })
      .catch((err) => {
        next(err);
      })
  }

  static removeFromCartDeleteHandler(req, res, next) { //params: cartProductId
    CartProduct.destroy({ where: { id: req.params.cartProductId } })
      .then((result) => {
        res.status(200).json({ message: "Delete successful." });
      })
      .catch((err) => {
        next(err);
      })
  }

  static async checkoutPatchHandler(req, res, next) { // params: cartId path: /cart/checkout
    try {
      const cartInfo = await ShoppingCart.findOne({ where: { UserId: req.tokenPayload.id } })
      const result = await CartProduct.update({ status: 1 },
        { where: { ShoppingCartId: cartInfo.id, status: 0 } })
      res.status(200).json({ message: 'Checked out successfully!' })
    } catch (err) {
      next(err);
    }
  }

  static async showPurchaseHistoryGetHandler(req, res, next) { //path: /cart/history
    try {
      const cartInfo = await ShoppingCart.findOne({ where: { UserId: req.tokenPayload.id } })
      const data = await CartProduct.findAll({
        where: { ShoppingCartId: cartInfo.id, status: 1 },
        include: Product
      })
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ShoppingCartController;
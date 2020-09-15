const { Product } = require('../models/index.js');

class ProductController {
  static addProductPostHandler(req, res, next) {
    req.body.price = Number(req.body.price);
    req.body.stock = Number(req.body.stock);

    Product.create({
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      })
  }

  static getProductListHandler(req, res, next) {
    Product.findAll({ order: ['id'] })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      })
  }

  static updateProductPatchHandler(req, res, next) {

    Product.update({
      name: req.body.name,
      image_url: req.body.image_url,
      price: Number(req.body.price),
      stock: Number(req.body.stock)
    }, { where: { id: req.params.productId } })
      .then((data) => {
        res.status(200).json({ message: "Update successful." });
      })
      .catch((err) => {
        next(err);
      })

  }

  static deleteProductHandler(req, res, next) {
    Product.destroy({ where: { id: req.params.productId } })
      .then((data) => {
        res.status(200).json({ message: "Delete successful." });
      })
      .catch((err) => {
        next(err);
      })
  }

}

module.exports = ProductController;
const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/product-controller.js');
const authenticateUser = require("../middlewares/authentication.js");
const adminAuthorization = require("../middlewares/authorization.js");

router.use(authenticateUser);
router.post('/', adminAuthorization, ProductController.addProductPostHandler);
router.get('/', ProductController.getProductListHandler);
router.patch('/:productId', adminAuthorization, ProductController.updateProductPatchHandler);
router.delete('/:productId', adminAuthorization, ProductController.deleteProductHandler);

module.exports = router;
const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/product-controller.js');
const authenticateUser = require("../middlewares/authentication.js");
const adminAuthorization = require("../middlewares/admin-authorization.js");

router.get('/', ProductController.getProductListHandler);
router.use(authenticateUser);
router.post('/', adminAuthorization, ProductController.addProductPostHandler);
router.get('/:productId', ProductController.searchByIdGetHandler);
router.put('/:productId', adminAuthorization, ProductController.updateProductPutHandler);
router.delete('/:productId', adminAuthorization, ProductController.deleteProductHandler);

module.exports = router;
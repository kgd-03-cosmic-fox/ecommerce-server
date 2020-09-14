const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/product-controller.js');

router.post('/', ProductController.addProductPostHandler);
router.get('/', ProductController.getProductListHandler);
router.patch('/:productId', ProductController.updateProductPatchHandler);
router.delete('/:productId', ProductController.deleteProductHandler);

module.exports = router;
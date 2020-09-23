const express = require('express');
const router = express.Router();
const ShoppingCartController = require('../controllers/shoppingcart-controller.js');
const cartAuthorization = require('../middlewares/cart-authorization.js'); //used for params cartProductId
const authenticateUser = require('../middlewares/authentication');

router.use(authenticateUser);
router.get('/', ShoppingCartController.fetchCartContentGetHandler);
router.post('/:productId', ShoppingCartController.addToCartPostHandler); //uses token so it doesnt need auth
router.patch('/:cartProductId', cartAuthorization, ShoppingCartController.editCartItemQuantityPatchHandler);
router.delete('/:cartProductId', cartAuthorization, ShoppingCartController.removeFromCartDeleteHandler);

module.exports = router;
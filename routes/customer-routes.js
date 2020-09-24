const router = require('express').Router();
const UserController = require('../controllers/user-controller.js');
const CartProductController = require('../controllers/cart-product-controller.js')
const ProductController = require('../controllers/product-controller.js');
const authentication = require('../middlewares/authentication.js');
const errorHandler = require('../middlewares/errorHandler.js');
const authorizationUser = require('../middlewares/user-authorize.js')
router.post('/login',UserController.postLogin)
router.post('/register',UserController.postRegister)
router.use(authentication)
router.get('/items',ProductController.getProduct)
router.get('/items/:id',ProductController.getById)
router.get('/cart', CartProductController.getCartProduct)
router.get('/cart/:id', CartProductController.getCartProductById)
router.post('/cart/:productId', CartProductController.postCartProduct)
router.patch('/cart/:id', authorizationUser, CartProductController.patchCartProduct)
router.delete('/cart/:id', authorizationUser, CartProductController.deleteCartProduct)
router.use(errorHandler)
module.exports = router

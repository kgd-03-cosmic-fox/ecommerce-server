const router = require('express').Router();
const UserController = require('../controllers/user-controller.js');
const ProductController = require('../controllers/product-controller.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const errorHandler = require('../middlewares/errorHandler.js');
router.post('/login',UserController.postLogin)
router.post('/register',UserController.postRegister)
router.use(authentication)
router.get('/items',ProductController.getProduct)
router.post('/items',ProductController.postProduct)
router.get('/items/:id',ProductController.getById)
router.put('/items/:id',authorization,ProductController.putProduct)
router.delete('/items/:id',authorization,ProductController.deleteProduct)
router.use(errorHandler)
module.exports = router

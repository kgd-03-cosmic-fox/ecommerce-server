const router = require('express').Router()
const UserController = require('../controllers/user-controller.js')
const ProductController = require('../controllers/product-controller.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')
router.post('/login',UserController.postLogin)
router.post('/register',UserController.postRegister)
router.use(authentication)
router.get('/products',ProductController.getProduct)
router.post('/products',ProductController.postProduct)
router.get('/products/:id',ProductController.getById)
router.put('/products/:id',authorization,ProductController.putProduct)
router.delete('/products/:id',authorization,ProductController.deleteProduct)
module.exports = router

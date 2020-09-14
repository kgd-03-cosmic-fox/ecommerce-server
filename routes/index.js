const router = require('express').Router()
const UserController = require('../controllers/user-controller.js')
const ProductController = require('../controllers/product-controller.js')
router.post('/login',UserController.postLogin)
router.post('/register',UserController.postRegister)
router.post('/',ProductController.postProduct)
// router.put('/:id',ProductController.putProduct)
// router.delete('/:id',ProductController.deleteProduct)
module.exports = router

const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/product-controller.js')
const authenticate = require('../middlewares/authenticate.js')
const authorization = require('../middlewares/authorize.js')

router.use(authenticate)
router.get('/' , ProductController.getProduct)
router.get('/:id', authorization ,ProductController.getProductById)
router.post('/' , authorization ,ProductController.postProduct)
router.put('/:id' , authorization ,ProductController.putProduct)
router.delete('/:id' , authorization ,ProductController.deleteProduct)

module.exports = router
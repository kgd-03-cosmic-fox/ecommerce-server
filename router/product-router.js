const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/product-controller.js')

router.post('/' , ProductController.postProduct)

module.exports = router
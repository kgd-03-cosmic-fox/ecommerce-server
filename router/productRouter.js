const express = require(`express`)
const router = express.Router()
const ProductController = require(`../controllers/productController`)

router.post(`/`,ProductController.postNewProduct)

module.exports = router
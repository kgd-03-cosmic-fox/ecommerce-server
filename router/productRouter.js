const express = require(`express`)
const router = express.Router()
const ProductController = require(`../controllers/productController`)

router.post(`/`,ProductController.postNewProduct)
router.put(`/:id`,ProductController.putProduct)
router.delete(`/:id`,ProductController.deleteProduct)

module.exports = router
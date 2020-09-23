const express = require('express')
const CartController = require('../controllers/cart-controller')
const router = express.Router()

router.get('/', CartController.getCartList)
router.post('/:prodId', CartController.addCartList)
router.put('/:prodId', CartController.updateCartList)
router.delete('/:prodId', CartController.deleteProdCartList)
router.delete('/', CartController.deleteMyCartList)
router.get('/buy', CartController.buyInCart)
module.exports = router
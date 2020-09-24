const express = require('express')
const CartController = require('../controllers/cart-controller')
const router = express.Router()
const authorizationCustomer = require('../middlewares/authorize-customer')

router.get('/', CartController.getCartList)
router.post('/:prodId', CartController.addCartList)
router.put('/:prodCartId', authorizationCustomer ,CartController.updateCartList)
router.delete('/:prodCartId', authorizationCustomer ,CartController.deleteProdCartList)
router.delete('/', CartController.deleteMyCartList)

module.exports = router
const express = require('express')
const router = express.Router()

const userRouter = require('./user-router.js')
const productRouter = require('./product-router.js')
const cartRouter = require('./cart-router.js')
const transactionRouter = require('./transaction-router.js')
const errorHandler = require('../middlewares/errorHandler.js')
const authenticate = require('../middlewares/authenticate.js')

router.use('/' , userRouter)

router.use(authenticate)
router.use('/products' , productRouter)
router.use('/carts', cartRouter)
router.use('/transactions', transactionRouter)
router.use(errorHandler)

module.exports = router
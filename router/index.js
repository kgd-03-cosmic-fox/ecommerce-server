const express = require('express')
const router = express.Router()

const userRouter = require('./user-router.js')
const productRouter = require('./product-router.js')
const errorHandler = require('../middlewares/errorHandler.js')

router.use('/' , userRouter)
router.use('/products' , productRouter)
router.use(errorHandler)

module.exports = router
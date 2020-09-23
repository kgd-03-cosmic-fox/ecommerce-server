const express = require(`express`)
const CartController = require(`../controllers/cartController.js`)
const UserController = require(`../controllers/userController.js`)
const authentication = require("../middlewares/authentication.js")
const router = express.Router()
const customerAuthorization = require(`../middlewares/customerAuthorization`)
const errorHandler = require("../middlewares/errorHandler")
const productRouter = require(`./productRouter`)

router.post(`/register`, UserController.postRegister)
router.post(`/login`, UserController.postLogin)

router.use(authentication)
router.use(`/product`, productRouter)
router.post(`/cart/:productId`, customerAuthorization, CartController.postCart)
router.get(`/cart`, CartController.getCart)
router.patch(`/cart/:cartProductId`, CartController.patchCart)
router.delete(`/cart/:cartProductId`, CartController.deleteCart)

router.use(errorHandler)

module.exports = router
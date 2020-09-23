const express = require(`express`)
const router = express.Router()
const UserController = require(`../controllers/userController`)
const productRouter = require(`./productRouter`)
const authentication = require(`../middlewares/authentication`)
const authorization = require("../middlewares/authorization")

router.post(`/login`,UserController.postLogin)

router.use(authentication) //Middleware Authentication
router.use(authorization) //Middleware Authorization
router.use(`/product`, productRouter)


module.exports = router
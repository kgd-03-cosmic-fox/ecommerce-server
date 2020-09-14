const express = require(`express`)
const router = express.Router()
const Controller = require(`../controllers/controller`)
const productRouter = require(`./productRouter`)
const authentication = require(`../middlewares/authentication`)
const authorization = require("../middlewares/authorization")


router.post(`/register`,Controller.postRegister)
router.post(`/login`,Controller.postLogin)

router.use(authentication) //Middleware Authentication
router.use(authorization)
router.use(`/product`,productRouter)

module.exports = router
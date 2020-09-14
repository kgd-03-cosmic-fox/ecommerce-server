const express = require(`express`)
const router = express.Router()
const Controller = require(`../controllers/controller`)
const productRouter = require(`./productRouter`)
const authentication = require(`../middlewares/authentication`)


router.post(`/register`,Controller.postRegister)
router.post(`/login`,Controller.postLogin)

router.use(authentication) //Middleware Authentication
router.use(`/product`,productRouter)

module.exports = router
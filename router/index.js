const express = require(`express`)
const router = express.Router()
const Controller = require(`../controllers/controller`)
const productRouter = require(`./productRouter`)

router.post(`/register`,Controller.postRegister)
router.post(`/login`,Controller.postLogin)

router.use(`/product`,productRouter)

module.exports = router
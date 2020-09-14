const express = require(`express`)
const router = express.Router()
const Controller = require(`../controllers/controller`)

router.post(`/register`,Controller.postRegister())

module.exports = router
const express = require(`express`)
const router = express.Router()
const adminRouter = require('./adminRouter.js')
const customerRouter = require('./customerRouter.js')

router.use('/admin', adminRouter)
router.use('/customer', customerRouter)

module.exports = router
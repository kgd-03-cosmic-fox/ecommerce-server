const router = require('express').Router();
const adminRoutes = require('./admin-routes.js')
const customerRoutes = require('./customer-routes.js')

router.use('/admin', adminRoutes)
router.use('/customer',customerRoutes)

module.exports = router

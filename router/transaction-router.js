const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transaction-controller')

router.get('/', TransactionController.getTransaction)

module.exports = router
const express = require('express');
const router = express.Router();
const ProductRouter = require('./products-router.js');

const UserController = require('../controllers/user-controller.js');

router.post('/login', UserController.loginPostHandler);
router.use('/products', ProductRouter);

module.exports = router;
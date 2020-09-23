const express = require('express');
const router = express.Router();
const ProductRouter = require('./products-router.js');
const CartRouter = require('./cart-router.js');

const UserController = require('../controllers/user-controller.js');

router.post('/register', UserController.registerUserPostHandler);
router.post('/login', UserController.loginPostHandler);
router.use('/products', ProductRouter);
router.use('/cart', CartRouter);

module.exports = router;
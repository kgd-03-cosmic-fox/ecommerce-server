const express = require('express');
const router = express.Router();
const ProductRouter = require('./products-router.js');

const UserController = require('../controllers/user-controller.js');

router.use('/products', ProductRouter);
router.post('/login', UserController.loginPostHandler);

module.exports = router;
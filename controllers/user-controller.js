const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ShoppingCartController = require('./shoppingcart-controller');

class UserController {
  //below is for registering new user with role of customer; admin (1) can only be added via seeder or db entry
  static registerUserPostHandler(req, res, next) { //hardcoding role to 0 instead of using hooks
    User.create({
      email: req.body.email,
      password: req.body.password,
      role: 0
    })
      .then((data) => {
        return ShoppingCartController.generateShoppingCart(data); //generate shoppingcart to user
      })
      .then((result) => {
        res.status(201).json({ message: `User ${req.body.email} successfully registered!` });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  }

  static loginPostHandler(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {
            let access_token = jwt.sign({ id: data.id, email: data.email, role: data.role }, process.env.JWT_SECRET_KEY);
            res.status(200).json({ access_token: access_token });
          } else {
            next({ message: 'Wrong ID/Password.' });
          }
        } else {
          next({ message: 'Wrong ID/Password.' });
        }

      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = UserController;
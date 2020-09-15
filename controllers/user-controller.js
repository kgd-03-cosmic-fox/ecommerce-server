const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
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
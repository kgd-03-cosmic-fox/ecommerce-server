const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

function authenticateUser(req, res, next) {
  try {
    if (!req.headers.access_token) {
      res.status(401).json({ message: "Unauthorized." });
    } else {
      req.tokenPayload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET_KEY);
      User.findByPk(req.tokenPayload.id)
        .then((data) => {
          if (data !== null) {
            next();
          } else {
            res.status(401).json({ message: "Unauthorized." });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Auth Fail: Internal Server Error" });
        })
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized." });
  }
}

module.exports = authenticateUser;
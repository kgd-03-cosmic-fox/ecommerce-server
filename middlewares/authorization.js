const { User } = require('../models/index.js');

function adminAuthorization(req, res, next) {
  User.findOne({ where: { id: req.tokenPayload.id } })
    .then((data) => {
      if (req.tokenPayload.role === 1) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized." });
      }
    })
    .catch((err) => {
      res.status(401).json({ message: "Unauthorized." });
    })
}

module.exports = adminAuthorization;
const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  try {
    if (!req.headers.access_token) {
      res.status(401).json({ message: "Unauthorized." });
    } else {
      req.tokenPayload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized." });
  }
}

module.exports = authenticateUser;
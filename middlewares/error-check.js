const e = require("express");

function errorChecker(err, req, res, next) {
  if (err) {
    if (err.name === "SequelizeValidationError") {
      console.log(err.errors)
      res.status(400).json({ message: err.errors[0].message })
    } if (err.message === 'Wrong ID/Password.') {
      res.status(400).json({ message: 'Wrong ID/Password.' });
    }
    else {
      res.status(500).json({ message: 'Internal Server Errorzzz' })
    }
  }
}

module.exports = errorChecker;
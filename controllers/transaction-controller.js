const {Cart, Transaction} = require('../models')

class TransactionController {
  
  static getTransaction (req, res, next) {

    Cart.findOne({
      where: {
        UserId : req.isLoggedIn.id
      }
    })
    .then(data => {

      return Transaction.findAll({
        where: {
          CartId : data.id
        },
        include: Product
      })
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)

  }

}

module.exports = TransactionController
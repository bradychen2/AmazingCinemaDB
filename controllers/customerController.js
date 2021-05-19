const queries = require('../queries/customerQueries')

const customerController = {
  displayCustomers: (req, res) => {
    res.render('customers')
  }
}

module.exports = customerController
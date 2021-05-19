const queries = require('../queries/ticketQueries')

const ticketController = {
  displayTickets: (req, res) => {
    res.render('tickets')
  }
}

module.exports = ticketController
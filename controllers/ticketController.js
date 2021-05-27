const queries = require('../queries/ticketQueries')

const ticketController = {
  displayTickets: async (req, res) => {
    let context = {}
    const mysql = req.app.get('mysql')

    try {
      context.tickets = await queries.getTickets(res, mysql)
      // console.log(context.tickets)
      res.render('tickets', context)
    } catch (err) {
      console.log(err)
    }
  },
  insertTickets: async (req, res) => {
    const mysql = req.app.get('mysql')
    const inserts = [
      req.body.movieId,
      req.body.customerId,
      req.body.seat,
      req.body.time,
      req.body.price
    ]
    console.log(inserts)

    try {
      await queries.creatTickets(mysql, inserts)

      return res.redirect('/tickets')
    } catch (err) {
      console.log(err)
    }
  },
  filterTickets: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchTicBy
    const searchKeyword = '%' + req.query.ticKey + '%'

    try {
      switch (searchBy) {
        case 'movieName':
          context.tickets = await queries.searchTicByMovName(res, mysql, searchKeyword)
          break
        case 'auditoriumName':
          context.tickets = await queries.searchTicByAudName(res, mysql, searchKeyword)
          break
        case 'customerName':
          context.tickets = await queries.searchTicByCusName(res, mysql, searchKeyword)
          break
        default:
          context.tickets = await queries.getTickets(res, mysql)
      }

      return res.render('tickets', context)
    } catch (err) {
      console.log(err)
    }
  },
  deleteTicket: async (req, res) => {
    const ticket_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      await queries.deleteTickets(res, mysql, ticket_id)
      res.redirect('/tickets')
    } catch (err) {
      console.log(err)
    }
  },
  editTicket: async (req, res) => {
    const mysql = req.app.get('mysql')
    let updateInfo = [
      req.body.movieId,
      req.body.customerId,
      req.body.seat,
      req.body.time,
      req.body.price,
      req.params.id
    ]

    try {
      console.log(updateInfo)
      await queries.updateTic(res, mysql, updateInfo)
      return res.redirect('/tickets')
    } catch (err) {
      console.log(err)
    }
  },

  getEditTicket: async (req, res) => {
    let context = {}
    const ticket_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.ticket = await queries.getTicket(res, mysql, ticket_id)
      res.render('editTicket', context)
    } catch (err) {
      console.log(err)
    }
  }
}


module.exports = ticketController
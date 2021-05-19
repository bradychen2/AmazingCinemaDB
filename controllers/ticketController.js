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
  insertTickets:async(req, res) => {
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
  filterTickets:async(req,res)=>{
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchTicBy
    const searchKeyword = '%' + req.query.ticKey + '%'

    try {
      switch (searchBy) {
        case 'movieName':
          context.moviesAuditoriums = await queries.searchTicByMovName(res, mysql, searchKeyword)
          break
        case 'auditoriumName':
          context.moviesAuditoriums = await queries.searchTicByAudName(res, mysql, searchKeyword)
          break
        case 'customerName':
          context.moviesAuditoriums = await queries.searchTicByCusName(res, mysql, searchKeyword)
          break
        default:
          context.moviesAuditoriums = await queries.getTickets(res, mysql)
      }

      context.tickets = await queries.getTickets(res, mysql)

      return res.render('tickets', context)
    } catch (err) {
      console.log(err)
    }
  }
  }


module.exports = ticketController
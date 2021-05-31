const queries = require('../queries/ticketQueries')
const maQueries = require('../queries/movieAudiQueries')
const cusQueries = require('../queries/customerQueries')

const ticketController = {
  displayTickets: async (req, res) => {
    let context = {}
    const mysql = req.app.get('mysql')

    try {
      context.tickets = await queries.getTickets(res, mysql)
      context.moviesAuditoriums = await maQueries.getMoviesAuditoriums(res, mysql)
      context.customers = await cusQueries.getCustomers(res, mysql)
      context.showingMovies = []

      // build the strings and context.showingMovies
      context.moviesAuditoriums.forEach(obj => {
        let showingMovie =
          obj.movie_name + ' at ' + obj.auditorium_name
          + ', Time: ' + obj.time_slot
        let movie_auditorium_id = obj.movie_auditorium_id
        let time_slot = obj.time_slot
        context.showingMovies.push({ showingMovie, movie_auditorium_id, time_slot })
      })

      // sort the showingMovies list by movie name
      context.showingMovies =
        context.showingMovies.sort((a, b) => {
          if (a.showingMovie < b.showingMovie) { return -1 }
          else if (a.showingMovie > b.showingMovie) { return 1 }
          else { return 0 }
        })

      req.session.showingMovies = context.showingMovies
      req.session.customers = context.customers
      res.render('tickets', context)
    } catch (err) {
      console.log(err)
    }
  },
  insertTickets: async (req, res) => {
    const mysql = req.app.get('mysql')

    try {
      // concatenate date and time
      const movieAudi =
        await maQueries.getMovieAuditorium(res, mysql, req.body.movie_auditorium_id)
      const time = movieAudi.time_slot
      const dateTime = req.body.date + '-' + time

      const inserts = [
        req.body.movie_auditorium_id,
        req.body.customerId,
        req.body.seat,
        dateTime,
        req.body.price
      ]

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

      context.showingMovies = req.session.showingMovies
      context.customers = req.session.customers
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
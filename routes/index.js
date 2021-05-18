const movieAudiController = require('../controllers/movieAudiController')
const ticketController = require('../controllers/ticketController')
const theaterController = require('../controllers/theaterController')
const customerController = require('../controllers/customerController')
const projectorController = require('../controllers/projectorController')

module.exports = (app) => {
  // Homepage
  app.get('/', (req, res) => {
    res.render('index')
  })
  app.get('/movies', movieAudiController.displayMoviesAuditoriums)
  app.post('/movies', movieAudiController.insertMovie)
  app.post('/auditoriums', movieAudiController.insertAuditorium)
  app.post('/moviesAuditoriums', movieAudiController.insertMovieAuditorium)
  app.get('/tickets', ticketController.displayTickets)
  app.get('/theaters', theaterController.displayTheaters)
  app.get('/customers', customerController.displayCustomers)
  app.get('/projectors', projectorController.displayProjectors)
}

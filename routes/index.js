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

  app.get('/movies', movieAudiController.getMoviesAuditoriums)
  app.get('/tickets', ticketController.getTickets)
  app.get('/theaters', theaterController.getTheaters)
  app.get('/customers', customerController.getCustomers)
  app.get('/projectors', projectorController.getProjectors)
}

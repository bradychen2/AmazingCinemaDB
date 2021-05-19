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
  // ---------------------Movies & Auditoriums---------------------
  // Display
  app.get('/movies', movieAudiController.displayMoviesAuditoriums)
  app.get('/movies/edit/:id', movieAudiController.getEditMovie)
  app.get('/auditoriums/edit/:id', movieAudiController.getEditAuditorium)
  app.get('/moviesAuditoriums/edit/:id', movieAudiController.getEditMovieAuditorium)
  // Insert
  app.post('/movies', movieAudiController.insertMovie)
  app.post('/auditoriums', movieAudiController.insertAuditorium)
  app.post('/moviesAuditoriums', movieAudiController.insertMovieAuditorium)
  // Filter
  app.get('/movies/search', movieAudiController.filterMovies)
  app.get('/auditoriums/search', movieAudiController.filterAuditoriums)
  app.get('/moviesAuditoriums/search', movieAudiController.filterMoviesAuditoriums)
  // Edit


  app.get('/tickets', ticketController.displayTickets)

  // ---------------------------Theaters--------------------------
  app.get('/theaters', theaterController.displayTheaters)
  app.post('/theaters', theaterController.insertTheater)
  app.get('/theaters/search', theaterController.filterTheaters)

  app.get('/customers', customerController.displayCustomers)
  app.get('/projectors', projectorController.displayProjectors)
}

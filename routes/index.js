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
  app.put('/movies/:id', movieAudiController.editMovie)
  app.put('/auditoriums/:id', movieAudiController.editAuditorium)
  app.put('/moviesAuditoriums/:id', movieAudiController.editMovieAuditorium)
  // Delete
  app.delete('/movies/:id', movieAudiController.deleteMovie)
  app.delete('/auditoriums/:id', movieAudiController.deleteAuditorium)
  app.delete('/moviesAuditoriums/:id', movieAudiController.deleteMovieAuditorium)


  // ---------------------------Theaters--------------------------
  // Display
  app.get('/theaters', theaterController.displayTheaters)
  app.get('/theaters/edit/:id', theaterController.getEditTheater)
  // Insert
  app.post('/theaters', theaterController.insertTheater)
  // Filter
  app.get('/theaters/search', theaterController.filterTheaters)
  // Edit
  app.put('/theaters/:id', theaterController.editTheater)
  // Delete
  app.delete('/theaters/:id', theaterController.deleteTheater)

  // ----------------------------Tickets---------------------------
  app.get('/tickets', ticketController.displayTickets)
  app.post('/tickets', ticketController.insertTickets)
  app.get('/tickets/search', ticketController.filterTickets)
  app.delete('/tickets/:id', ticketController.deleteTicket)
  app.get('/tickets/edit/:id', ticketController.getEditTicket)
  app.put('/tickets/:id', ticketController.editTicket)


  // ---------------------------Projectors--------------------------
  app.get('/projectors', projectorController.displayProjectors)
  app.post('/projectors', projectorController.insertProjectors)
  app.get('/projectors/search', projectorController.filterProjectors)
  app.delete('/projectors/:id', projectorController.deleteProjectors)
  app.get('/projectors/edit/:id', projectorController.getEditPro)
  app.put('/projectors/:id', projectorController.editPro)


  // ----------------------------Customers---------------------------
  app.get('/customers', customerController.displayCustomers)
  app.post('/customers', customerController.insertCustomers)
  app.get('/customers/search', customerController.filterCustomers)
  app.delete('/customers/:id', customerController.deleteCus)
  app.get('/customers/edit/:id', customerController.getEditCus)
  app.put('/customers/:id', customerController.editCus)

}

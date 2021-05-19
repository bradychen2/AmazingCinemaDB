const maQueries = require('../queries/movieAudiQueries')
const theaterQueries = require('../queries/theaterQueries')
const projectorQueries = require('../queries/projectorQueries')

const movieAudiController = {
  displayMoviesAuditoriums: async (req, res) => {
    let context = {}
    const mysql = req.app.get('mysql')

    try {
      context.movies = await maQueries.getMovies(res, mysql)
      context.auditoriums = await maQueries.getAuditoriums(res, mysql)
      context.moviesAuditoriums = await maQueries.getMoviesAuditoriums(res, mysql)
      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  },

  getEditMovie: async (req, res) => {
    let context = {}
    const movie_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.movie = await maQueries.getMovie(res, mysql, movie_id)
      return res.render('editMovie', context)
    } catch (err) {
      console.log(err)
    }
  },

  getEditAuditorium: async (req, res) => {
    let context = {}
    const auditorium_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.auditorium = await maQueries.getAuditorium(res, mysql, auditorium_id)
      context.theaters = await theaterQueries.getTheaters(res, mysql)
      context.projectors = await projectorQueries.getProjectors(res, mysql)

      return res.render('editAuditorium', context)
    } catch (err) {
      console.log(err)
    }
  },

  getEditMovieAuditorium: async (req, res) => {
    let context = {}
    const movie_auditorium_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.movieAuditorium = await maQueries.getMovieAuditorium(res, mysql, movie_auditorium_id)
      context.movies = await maQueries.getMovies(res, mysql)
      context.auditoriums = await maQueries.getAuditoriums(res, mysql)

      return res.render('editMovieAuditorium', context)
    } catch (err) {
      console.log(err)
    }
  },

  insertMovie: async (req, res) => {
    const mysql = req.app.get('mysql')
    const inserts = [
      req.body.movieName,
      req.body.releaseDate,
      req.body.outOfTheaterDate,
      req.body.rating
    ]

    try {
      await maQueries.createMovie(mysql, inserts)

      return res.redirect('/movies')
    } catch (err) {
      console.log(err)
    }
  },

  insertAuditorium: async (req, res) => {
    const mysql = req.app.get('mysql')
    const inserts = [
      req.body.auditoriumName,
      req.body.seats,
      req.body.theaterId,
      req.body.projectorId
    ]

    try {
      await maQueries.createAuditorium(mysql, inserts)

      return res.redirect('/movies')
    } catch (err) {
      console.log(err)
    }
  },

  insertMovieAuditorium: async (req, res) => {
    const mysql = req.app.get('mysql')
    const inserts = [
      req.body.movieId,
      req.body.auditoriumId,
      req.body.timeSlot,
    ]

    try {
      await maQueries.createMovieAuditorium(mysql, inserts)

      return res.redirect('/movies')
    } catch (err) {
      console.log(err)
    }
  },

  filterMovies: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchMoviesBy
    const searchKeyword = '%' + req.query.moviesKeyword + '%'

    try {
      if (searchBy.length === 0) {
        context.movies = await maQueries.getMovies(res, mysql)
      } else {
        context.movies = await maQueries.searchMovies(res, mysql, searchKeyword)
      }
      context.auditoriums = await maQueries.getAuditoriums(res, mysql)
      context.moviesAuditoriums = await maQueries.getMoviesAuditoriums(res, mysql)

      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  },

  filterAuditoriums: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchAuditoriumsBy
    const searchKeyword = '%' + req.query.auditoriumsKeyword + '%'

    try {
      switch (searchBy) {
        case 'auditoriumName':
          context.auditoriums = await maQueries.searchAudiByName(res, mysql, searchKeyword)
          break
        case 'theaterName':
          context.auditoriums = await maQueries.searchAudiByTheaterName(res, mysql, searchKeyword)
          break
        case 'projectorType':
          context.auditoriums = await maQueries.searchAudiByProjectorType(res, mysql, searchKeyword)
          break
        default:
          context.auditoriums = await maQueries.getAuditoriums(res, mysql)
      }

      context.movies = await maQueries.getMovies(res, mysql)
      context.moviesAuditoriums = await maQueries.getMoviesAuditoriums(res, mysql)

      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  },

  filterMoviesAuditoriums: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchMoviesAudisBy
    const searchKeyword = '%' + req.query.moviesAudisKeyword + '%'

    try {
      switch (searchBy) {
        case 'movieName':
          context.moviesAuditoriums = await maQueries.searchMAByMovieName(res, mysql, searchKeyword)
          break
        case 'auditoriumName':
          context.moviesAuditoriums = await maQueries.searchMAByAuditoriumName(res, mysql, searchKeyword)
          break
        case 'timeSlot':
          context.moviesAuditoriums = await maQueries.searchMAByTimeSlot(res, mysql, searchKeyword)
          break
        default:
          context.moviesAuditoriums = await maQueries.getMoviesAuditoriums(res, mysql)
      }

      context.movies = await maQueries.getMovies(res, mysql)
      context.auditoriums = await maQueries.getAuditoriums(res, mysql)

      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = movieAudiController
const queries = require('../queries/movieAudiQueries')

const movieAudiController = {
  displayMoviesAuditoriums: async (req, res) => {
    let context = {}
    const mysql = req.app.get('mysql')

    try {
      context.movies = await queries.getMovies(res, mysql)
      context.auditoriums = await queries.getAuditoriums(res, mysql)
      context.moviesAuditoriums = await queries.getMoviesAuditoriums(res, mysql)

      return res.render('moviesAuditoriums', context)
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
      await queries.createMovie(mysql, inserts)

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
      await queries.createAuditorium(mysql, inserts)

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
      await queries.createMovieAuditorium(mysql, inserts)

      return res.redirect('/movies')
    } catch (err) {
      console.log(err)
    }
  },

  filterMovies: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    let searchBy = req.query.searchMoviesBy
    const searchKeyword = '%' + req.query.moviesKeyword + '%'

    try {
      if (searchBy.length === 0) {
        context.movies = await queries.getMovies(res, mysql)
      } else {
        context.movies = await queries.searchMovies(res, mysql, searchKeyword)
      }
      context.auditoriums = await queries.getAuditoriums(res, mysql)
      context.moviesAuditoriums = await queries.getMoviesAuditoriums(res, mysql)

      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  },

  filterAuditoriums: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    let searchBy = req.query.searchAuditoriumsBy
    const searchKeyword = '%' + req.query.auditoriumsKeyword + '%'

    try {
      switch (searchBy) {
        case 'auditoriumName':
          context.auditoriums = await queries.searchAudiByName(res, mysql, searchKeyword)
          break
        case 'theaterName':
          context.auditoriums = await queries.searchAudiByTheaterName(res, mysql, searchKeyword)
          break
        case 'projectorType':
          context.auditoriums = await queries.searchAudiByProjectorType(res, mysql, searchKeyword)
          break
        default:
          context.auditoriums = await queries.getAuditoriums(res, mysql)
      }

      context.movies = await queries.getMovies(res, mysql)
      context.moviesAuditoriums = await queries.getMoviesAuditoriums(res, mysql)

      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  },

  filterMoviesAuditoriums: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    searchBy = req.query.searchMoviesAudisBy
    searchKeyword = '%' + req.query.moviesAudisKeyword + '%'

    try {
      switch (searchBy) {
        case 'movieName':
          context.moviesAuditoriums = await queries.searchMAByMovieName(res, mysql, searchKeyword)
          break
        case 'auditoriumName':
          context.moviesAuditoriums = await queries.searchMAByAuditoriumName(res, mysql, searchKeyword)
          break
        case 'timeSlot':
          context.moviesAuditoriums = await queries.searchMAByTimeSlot(res, mysql, searchKeyword)
          break
        default:
          context.moviesAuditoriums = await queries.getMoviesAuditoriums(res, mysql)
      }

      context.movies = await queries.getMovies(res, mysql)
      context.auditoriums = await queries.getAuditoriums(res, mysql)

      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = movieAudiController
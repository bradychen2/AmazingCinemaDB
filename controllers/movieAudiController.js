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
      context.theaters = await theaterQueries.getTheaters(res, mysql)
      context.projectors = await projectorQueries.getProjectors(res, mysql)

      const lists = ['moviesList', 'auditoriumsList', 'theatersList', 'projectorsList']
      for (let list of lists) {
        req.session[list] = []
      }

      context.movies.forEach(movie => {
        const { movie_id, name } = movie
        req.session['moviesList'].push({ movie_id, name })
      })

      context.auditoriums.forEach(auditorium => {
        const { auditorium_id, auditorium_name } = auditorium
        req.session['auditoriumsList'].push({ auditorium_id, auditorium_name })
      })

      context.theaters.forEach(theater => {
        const { theater_id, name } = theater
        req.session['theatersList'].push({ theater_id, name })
      })
      context.projectors.forEach(projector => {
        const { projector_equipment_id, type } = projector
        req.session['projectorsList'].push({ projector_equipment_id, type })
      })

      for (let prop in req.session) {
        if (prop !== 'cookie') { context[prop] = req.session[prop] }
      }

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
      for (let prop in req.session) {
        if (prop !== 'cookie') { context[prop] = req.session[prop] }
      }

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
      for (let prop in req.session) {
        if (prop !== 'cookie') { context[prop] = req.session[prop] }
      }

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
      for (let prop in req.session) {
        if (prop !== 'cookie') { context[prop] = req.session[prop] }
      }

      return res.render('moviesAuditoriums', context)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = movieAudiController
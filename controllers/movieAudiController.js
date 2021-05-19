const queries = {
  getMovies: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT movie_id, \
        name, \
        release_date, \
        out_of_theater_date, \
        rating FROM Movies;", (error, results, fields) => {
        if (error) {
          res.write(JSON.stringify(error))
          res.end()
        }
        resolve(results)
      })
    })
  },

  getAuditoriums: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT auditorium_id, \
	          auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
            Theaters.name AS theater_name, \
            projector_equipments.`type` AS projector_equipment_type \
      FROM Auditoriums \
      INNER JOIN Theaters ON Auditoriums.theater_id = Theaters.theater_id \
      INNER JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id \
      ORDER BY auditorium_id;", (error, results, fields) => {
        if (error) {
          res.write(JSON.stringify(error))
          res.end()
        }
        resolve(results)
      })
    })
  },

  getMoviesAuditoriums: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT Movies_Auditoriums.movie_auditorium_id, \
	          Movies.name AS movie_name, \
            Auditoriums.name AS auditorium_name, \
            time_slot \
      FROM Movies_Auditoriums \
      INNER JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
      INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
      ORDER BY Movies_Auditoriums.movie_auditorium_id;", (error, results, fields) => {
        if (error) {
          res.write(JSON.stringify(error))
          res.end()
        }
        resolve(results)
      })
    })
  },

  createMovie: (mysql, inserts) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "INSERT INTO \
                Movies (name, release_date, out_of_theater_date, rating) \
                VALUES(?, ?, ?, ?);",
        inserts,
        (error, results, fields) => {
          if (error) {
            console.log(error)
          }
          resolve()
        })
    })
  },

  createAuditorium: (mysql, inserts) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "INSERT INTO \
                Auditoriums(name, number_of_seats, theater_id, projector_equipment_id) \
                VALUES(?, ?, ?, ?);",
        inserts,
        (error, results, fields) => {
          if (error) {
            console.log(error)
          }
          resolve()
        }
      )
    })
  },

  createMovieAuditorium: (mysql, inserts) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "INSERT INTO \
                Movies_Auditoriums(movie_id, auditorium_id, time_slot) \
                VALUES(?, ?, ?);",
        inserts,
        (error, results, fields) => {
          if (error) {
            console.log(error)
          }
          resolve()
        }
      )
    })
  },

  searchMovies: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `movie_id`, \
          `name`, \
          `release_date`, \
          `out_of_theater_date`, \
          `rating` \
          FROM movies \
          WHERE LOWER(name) LIKE LOWER(?);",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  },

  searchAudiByName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `auditorium_id`, \
	              auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
                theaters.`name` AS theater_name, \
                projector_equipments.`type` AS projector_equipment_type \
          FROM auditoriums \
          INNER JOIN theaters \
          ON auditoriums.`theater_id` = Theaters.`theater_id` \
          INNER JOIN projector_equipments \
          ON auditoriums.`projector_equipment_id` = projector_equipments.`projector_equipment_id` \
          WHERE LOWER(auditoriums.name) LIKE LOWER(?) \
          ORDER BY auditoriums.auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  },

  searchAudiByTheaterName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `auditorium_id`, \
	              auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
                theaters.`name` AS theater_name, \
                projector_equipments.`type` AS projector_equipment_type \
          FROM auditoriums \
          INNER JOIN theaters \
          ON auditoriums.`theater_id` = Theaters.`theater_id` \
          INNER JOIN projector_equipments \
          ON auditoriums.`projector_equipment_id` = projector_equipments.`projector_equipment_id` \
          WHERE LOWER(theaters.name) LIKE LOWER(?) \
          ORDER BY auditoriums.auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  },

  searchAudiByProjectorType: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `auditorium_id`, \
	              auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
                theaters.`name` AS theater_name, \
                projector_equipments.`type` AS projector_equipment_type \
          FROM auditoriums \
          INNER JOIN theaters \
          ON auditoriums.`theater_id` = Theaters.`theater_id` \
          INNER JOIN projector_equipments \
          ON auditoriums.`projector_equipment_id` = projector_equipments.`projector_equipment_id` \
          WHERE LOWER(projector_equipments.type) LIKE LOWER(?) \
          ORDER BY auditoriums.auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  },

  searchMAByMovieName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT Movies_Auditoriums.movie_auditorium_id, \
	              Movies.name AS movie_name, \
                Auditoriums.name AS auditorium_name, \
                time_slot \
          FROM Movies_Auditoriums \
          INNER JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
          INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
          WHERE LOWER(Movies.name) LIKE LOWER(?) \
          ORDER BY Movies_Auditoriums.movie_auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  },

  searchMAByAuditoriumName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT Movies_Auditoriums.movie_auditorium_id, \
	              Movies.name AS movie_name, \
                Auditoriums.name AS auditorium_name, \
                time_slot \
          FROM Movies_Auditoriums \
          INNER JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
          INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
          WHERE LOWER(Auditoriums.name) LIKE LOWER(?) \
          ORDER BY Movies_Auditoriums.movie_auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  },

  searchMAByTimeSlot: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  }
}


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
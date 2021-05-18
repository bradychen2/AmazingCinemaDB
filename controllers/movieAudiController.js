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
	          Auditoriums.name AS auditorium_name, number_of_seats, \
            Theaters.name AS theaters_name, \
            Projector_Equipments.type AS projector_equipment_type \
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
	          Movies.name AS movies_name, \
            Auditoriums.name AS auditoriums_name, \
            time_slot \
      FROM Movies_Auditoriums \
      INNER JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
      INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id;", (error, results, fields) => {
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
  }
}

module.exports = movieAudiController
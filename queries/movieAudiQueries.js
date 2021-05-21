const queries = {
  getMovies: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT movie_id, \
        name, \
        release_date, \
        out_of_theater_date, \
        rating FROM Movies;",
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
  },

  getMovie: (res, mysql, movie_id) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        `SELECT movie_id, \
        name, \
        release_date, \
        out_of_theater_date, \
        rating FROM Movies \
        WHERE movie_id = ${movie_id};`,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          console.log(results)
          resolve(results[0])
        }
      )
    })
  },

  getAuditoriums: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT auditorium_id, \
	          Auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
            Theaters.name AS theater_name, \
            Projector_Equipments.`type` AS projector_equipment_type \
      FROM Auditoriums \
      INNER JOIN Theaters ON Auditoriums.theater_id = Theaters.theater_id \
      INNER JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id \
      ORDER BY auditorium_id;",
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
  },

  getAuditorium: (res, mysql, auditorium_id) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        `SELECT auditorium_id, \
              auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
              Theaters.name AS theater_name, \
              projector_equipments.type AS projector_equipment_type \
        FROM Auditoriums \
        INNER JOIN Theaters ON Auditoriums.theater_id = Theaters.theater_id \
        INNER JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id \
        WHERE auditorium_id = ${auditorium_id} \
        ORDER BY auditorium_id;`,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          console.log(results)
          resolve(results[0])
        }
      )
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
        ORDER BY Movies_Auditoriums.movie_auditorium_id;",
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  },

  getMovieAuditorium: (res, mysql, movie_auditorium_id) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        `SELECT Movies_Auditoriums.movie_auditorium_id, \
              	Movies.name AS movies_name, \
                Auditoriums.name AS auditoriums_name, time_slot \
          FROM Movies_Auditoriums \
          INNER JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
          INNER JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
          WHERE Movies_Auditoriums.movie_auditorium_id = ${movie_auditorium_id}\
          ORDER BY Movies_Auditoriums.movie_auditorium_id;`,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          resolve(results[0])
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
            console.log(error);
          }
          resolve();
        }
      );
    });
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
            console.log(error);
          }
          resolve();
        }
      );
    });
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
            console.log(error);
          }
          resolve();
        }
      );
    });
  },

  searchMovies: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `movie_id`, \
          `name`, \
          `release_date`, \
          `out_of_theater_date`, \
          `rating` \
          FROM Movies \
          WHERE LOWER(name) LIKE LOWER(?);",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
  },

  searchAudiByName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `auditorium_id`, \
	              Auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
                Theaters.`name` AS theater_name, \
                Projector_Equipments.`type` AS projector_equipment_type \
          FROM Auditoriums \
          INNER JOIN Theaters \
          ON Auditoriums.`theater_id` = Theaters.`theater_id` \
          INNER JOIN Projector_Equipments \
          ON Auditoriums.`projector_equipment_id` = Projector_Equipments.`projector_equipment_id` \
          WHERE LOWER(Auditoriums.name) LIKE LOWER(?) \
          ORDER BY Auditoriums.auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
  },

  searchAudiByTheaterName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `auditorium_id`, \
	              Auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
                Theaters.`name` AS theater_name, \
                Projector_Equipments.`type` AS projector_equipment_type \
          FROM Auditoriums \
          INNER JOIN Theaters \
          ON Auditoriums.`theater_id` = Theaters.`theater_id` \
          INNER JOIN Projector_Equipments \
          ON Auditoriums.`projector_equipment_id` = Projector_Equipments.`projector_equipment_id` \
          WHERE LOWER(Theaters.name) LIKE LOWER(?) \
          ORDER BY Auditoriums.auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
  },

  searchAudiByProjectorType: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT `auditorium_id`, \
	              Auditoriums.name AS auditorium_name, number_of_seats AS number_of_seats, \
                Theaters.`name` AS theater_name, \
                Projector_Equipments.`type` AS projector_equipment_type \
          FROM Auditoriums \
          INNER JOIN Theaters \
          ON Auditoriums.`theater_id` = Theaters.`theater_id` \
          INNER JOIN Projector_Equipments \
          ON Auditoriums.`projector_equipment_id` = Projector_Equipments.`projector_equipment_id` \
          WHERE LOWER(Projector_Equipments.type) LIKE LOWER(?) \
          ORDER BY Auditoriums.auditorium_id;",
        searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
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
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
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
            res.write(JSON.stringify(error));
            res.end();
          }
          resolve(results);
        }
      );
    });
  },

  searchMAByTimeSlot: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query("", searchKeyword, (error, results, fields) => {
        if (error) {
          res.write(JSON.stringify(error));
          res.end();
        }
        resolve(results);
      });
    });
  },
};

module.exports = queries;

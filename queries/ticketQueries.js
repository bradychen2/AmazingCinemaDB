const sql_select =
  "SELECT DISTINCT ticket_id, \
                Movies.name AS movies_name, \
                Auditoriums.name AS auditoriums_name, \
                Customers.name AS customers_name, \
                Projector_Equipments.type AS projector, \
                Projector_Equipments.ticket_price AS price, \
                seat, time\
    FROM Tickets \
    LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id \
    LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
    LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
    LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id \
    LEFT JOIN Projector_Equipments ON Tickets.projector_equipment_id = Projector_Equipments.projector_equipment_id \
    ORDER BY Tickets.ticket_id;"
const sql_insert =
  "INSERT INTO Tickets(movie_auditorium_id, customer_id, seat, time, projector_equipment_id) \
                  VALUES(?, ?, ?, ?, (SELECT Auditoriums.projector_equipment_id FROM Movies_Auditoriums \
                    LEFT JOIN Auditoriums ON Auditoriums.auditorium_id = Movies_Auditoriums.auditorium_id\
                    LEFT JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id \
                   WHERE movie_auditorium_id = ?));"
const sqlInsertNoCus =
  "INSERT INTO Tickets(movie_auditorium_id, customer_id, seat, time, projector_equipment_id) \
                  VALUES(?, NULL, ?, ?, (SELECT Auditoriums.projector_equipment_id FROM Movies_Auditoriums \
                    LEFT JOIN Auditoriums ON Auditoriums.auditorium_id = Movies_Auditoriums.auditorium_id\
                    LEFT JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id \
                   WHERE movie_auditorium_id = ?));"
const sql_search1 =
  "SELECT DISTINCT ticket_id, \
                Movies.name AS movies_name, \
                Auditoriums.name AS auditoriums_name, \
                Customers.name AS customers_name, \
                Projector_Equipments.type AS projector, \
                Projector_Equipments.ticket_price AS price, \
                seat, time \
    FROM Tickets \
    LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id \
    LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
    LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
    LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id \
    LEFT JOIN Projector_Equipments ON Tickets.projector_equipment_id = Projector_Equipments.projector_equipment_id \
    WHERE LOWER(Movies.name) LIKE LOWER(?) \
    ORDER BY Tickets.ticket_id;"
const sql_search2 =
  "SELECT DISTINCT ticket_id, \
                Movies.name AS movies_name, \
                Auditoriums.name AS auditoriums_name, \
                Customers.name AS customers_name, \
                Projector_Equipments.type AS projector, \
                Projector_Equipments.ticket_price AS price, \
                seat, time \
    FROM Tickets \
    LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id \
    LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
    LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
    LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id \
    LEFT JOIN Projector_Equipments ON Tickets.projector_equipment_id = Projector_Equipments.projector_equipment_id \
    WHERE LOWER(Auditoriums.name) LIKE LOWER(?) \
    ORDER BY Tickets.ticket_id;"
const sql_search3 =
  "SELECT DISTINCT ticket_id, \
                Movies.name AS movies_name, \
                Auditoriums.name AS auditoriums_name, \
                Customers.name AS customers_name, \
                Projector_Equipments.type AS projector, \
                Projector_Equipments.ticket_price AS price, \
                seat, time \
    FROM Tickets \
    LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id \
    LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
    LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
    LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id \
    LEFT JOIN Projector_Equipments ON Tickets.projector_equipment_id = Projector_Equipments.projector_equipment_id \
    WHERE LOWER(Customers.name) LIKE LOWER(?) ORDER BY Tickets.ticket_id;"

const sql_get =
  "SELECT DISTINCT ticket_id, \
                  Movies.name AS movie_name, Movies_Auditoriums.movie_auditorium_id, \
                  Auditoriums.name AS auditorium_name,  \
                  Customers.name AS customers_name, Customers.customer_id, \
                  seat, time AS dateTime , \
                  Projector_Equipments.ticket_price AS price, \
                  Projector_Equipments.type AS projector \
      FROM Tickets \
      LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.movie_auditorium_id \
      LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id \
      LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id \
      LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id \
      LEFT JOIN Projector_Equipments ON Tickets.projector_equipment_id = Projector_Equipments.projector_equipment_id \
      Where ticket_id=? \
      ORDER BY Tickets.ticket_id;"
const updatesql =
  "UPDATE Tickets SET movie_auditorium_id = ?, \
                  customer_id = ?, seat = ?, time =?, \
                  projector_equipment_id= \
                  (SELECT Auditoriums.projector_equipment_id FROM Movies_Auditoriums \
                    LEFT JOIN Auditoriums ON Auditoriums.auditorium_id = Movies_Auditoriums.auditorium_id\
                    LEFT JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id \
                   WHERE movie_auditorium_id = ?) \
      WHERE ticket_id= ?;"
const updatesqlNoCus =
  "UPDATE Tickets SET movie_auditorium_id = ?, \
                  customer_id = NULL, \
                  seat = ?, time =?, \
                  projector_equipment_id = \
                  (SELECT Auditoriums.projector_equipment_id FROM Movies_Auditoriums \
                    LEFT JOIN Auditoriums ON Auditoriums.auditorium_id = Movies_Auditoriums.auditorium_id\
                    LEFT JOIN Projector_Equipments ON Auditoriums.projector_equipment_id = Projector_Equipments.projector_equipment_id \
                  WHERE movie_auditorium_id = ?) \
        WHERE ticket_id = ?;"

const queries = {
  getTickets: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_select, function (error, results, fields) {
        if (error) {
          res.write(JSON.stringify(error));
          res.end();
        }
        resolve(results);
      });
    });
  },

  creatTickets: (mysql, inserts) => {
    return new Promise((resolve, reject) => {
      // need two movies_auditoriums_id to query projector
      inserts.push(inserts[0])

      if (inserts[1].length === 0) {
        // No customer info
        inserts.splice(1, 1)

        mysql.pool.query(
          sqlInsertNoCus,
          inserts,
          (error, results, fields) => {
            if (error) {
              console.log(error)
              reject(error)
            }
            resolve()
          }
        )
      } else {
        mysql.pool.query(
          sql_insert,
          inserts,
          (error, results, fields) => {
            if (error) {
              console.log(error)
              reject(error)
            }
            resolve()
          })
      }
    })
  },

  searchTicByMovName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_search1,
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

  searchTicByAudName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_search2,
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

  searchTicByCusName: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_search3,
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

  deleteTickets: (res, mysql, ticket_id) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "DELETE FROM Tickets WHERE ticket_id = ?;",
        ticket_id,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          resolve()
        })
    })
  },

  updateTic: (res, mysql, updateInfo) => {
    return new Promise((resolve, reject) => {
      // need two movies_auditoriums_id to query projector
      updateInfo.splice(4, 0, updateInfo[0])

      if (updateInfo[1].length === 0) {
        // No customer info 
        updateInfo.splice(1, 1)

        mysql.pool.query(
          updatesqlNoCus,
          updateInfo,
          (error, results, fields) => {
            if (error) {
              reject(error)
            }
            resolve()
          }
        )
      } else {
        mysql.pool.query(
          updatesql,
          updateInfo,
          (error, results, fields) => {
            if (error) {
              reject(error)
            }
            resolve()
          })
      }
    })
  },

  getTicket: (res, mysql, ticket_id) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_get, ticket_id, function (error, results, fields) {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(results[0])
      });
    });
  }
};

module.exports = queries;

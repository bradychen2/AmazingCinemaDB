const sql_select =
  "SELECT DISTINCT ticket_id, Movies.name AS movies_name, Auditoriums.name AS auditoriums_name, Customers.name AS customers_name, seat, time, price FROM Tickets LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.auditorium_id LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id ORDER BY Tickets.ticket_id;";
const sql_insert =
  "INSERT INTO Tickets(movie_auditorium_id, customer_id, seat, time, price) VALUES(?,?,?,?,?);";
const sql_search1 = "SELECT DISTINCT ticket_id, Movies.name AS movies_name, Auditoriums.name AS auditoriums_name, Customers.name AS customers_name, seat, time, price FROM Tickets LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.auditorium_id LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id WHERE LOWER(Movies.name) LIKE LOWER(?) ORDER BY Tickets.ticket_id;"
const sql_search2 = "SELECT DISTINCT ticket_id, Movies.name AS movies_name, Auditoriums.name AS auditoriums_name, Customers.name AS customers_name, seat, time, price FROM Tickets LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.auditorium_id LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id WHERE LOWER(Auditoriums.name) LIKE LOWER(?) ORDER BY Tickets.ticket_id;"
const sql_search3 = "SELECT DISTINCT ticket_id, Movies.name AS movies_name, Auditoriums.name AS auditoriums_name, Customers.name AS customers_name, seat, time, price FROM Tickets LEFT JOIN Movies_Auditoriums ON Tickets.movie_auditorium_id = Movies_Auditoriums.auditorium_id LEFT JOIN Movies ON Movies_Auditoriums.movie_id = Movies.movie_id LEFT JOIN Auditoriums ON Movies_Auditoriums.auditorium_id = Auditoriums.auditorium_id LEFT JOIN Customers ON Tickets.customer_id = Customers.customer_id WHERE LOWER(Customers.name) LIKE LOWER(?) ORDER BY Tickets.ticket_id;"



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
      mysql.pool.query(sql_insert,inserts, function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        resolve();
      });
    });
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
  searchTicByAudName:(res, mysql, searchKeyword) => {
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
  searchTicByCusName:(res, mysql, searchKeyword) => {
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
  }
};

module.exports = queries;

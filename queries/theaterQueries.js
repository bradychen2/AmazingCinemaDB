const queries = {
  getTheaters: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT theater_id, \
                name, \
                address, \
                phone \
          FROM Theaters \
          ORDER BY theater_id;", (error, results, fields) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  },

  getTheater: (res, mysql, theater_id) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT theater_id, \
                name, \
                address, \
                phone \
          FROM Theaters \
          WHERE theater_id = ? \
          ORDER BY theater_id;",
        theater_id,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          resolve(results[0])
        })
    })
  },

  createTheater: (mysql, inserts) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "INSERT INTO Theaters(name, address, phone) VALUES(?, ?, ?);",
        inserts,
        (error, results, fields) => {
          if (error) {
            console.log(error)
          }
          resolve()
        })
    })
  },

  updateTheater: (res, mysql, updateInfo) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "UPDATE Theaters \
          SET	name = ?, \
              address = ?, \
              phone = ? \
          WHERE theater_id = ?;",
        updateInfo,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          resolve()
        })
    })
  },

  searchTheaters: (res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "SELECT theater_id, \
                name, \
                address, \
                phone \
          FROM Theaters \
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
}

module.exports = queries

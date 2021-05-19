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
          res.write(JSON.stringify(error))
          res.end()
        }
        resolve(results)
      })
    })
  },
}

module.exports = queries
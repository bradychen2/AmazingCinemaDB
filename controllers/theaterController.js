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

const theaterController = {
  displayTheaters: async (req, res) => {
    const context = {}
    const mysql = req.app.get('mysql')

    try {
      context.theaters = await queries.getTheaters(res, mysql)
      res.render('theaters', context)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = theaterController
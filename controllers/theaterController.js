const queries = require('../queries/theaterQueries')

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
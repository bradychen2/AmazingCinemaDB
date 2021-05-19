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
  },

  insertTheater: async (req, res) => {
    const mysql = req.app.get('mysql')
    const inserts = [
      req.body.name,
      req.body.address,
      req.body.phone,
    ]

    try {
      await queries.createMovie(mysql, inserts)

      return res.redirect('/theaters')
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = theaterController
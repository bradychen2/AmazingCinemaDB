const queries = require('../queries/theaterQueries')

const theaterController = {
  displayTheaters: async (req, res) => {
    let context = {}
    const mysql = req.app.get('mysql')

    try {
      context.theaters = await queries.getTheaters(res, mysql)
      res.render('theaters', context)
    } catch (err) {
      console.log(err)
    }
  },

  getEditTheater: async (req, res) => {
    let context = {}
    const theater_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.theater = await queries.getTheater(res, mysql, theater_id)
      res.render('editTheater', context)
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
      await queries.createTheater(mysql, inserts)

      return res.redirect('/theaters')
    } catch (err) {
      console.log(err)
    }
  },

  editTheater: async (req, res) => {
    const mysql = req.app.get('mysql')
    const updateInfo = [
      req.body.theaterName,
      req.body.address,
      req.body.phone,
      req.params.id
    ]

    try {
      await queries.updateTheater(res, mysql, updateInfo)

      return res.redirect('/theaters')
    } catch (err) {
      console.log(err)
    }
  },

  filterTheaters: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchTheatersBy
    const searchKeyword = '%' + req.query.theatersKeyword + '%'

    try {
      if (searchBy.length === 0) {
        context.theaters = await queries.getTheaters(res, mysql)
      } else {
        context.theaters = await queries.searchTheaters(res, mysql, searchKeyword)
      }
      res.render('theaters', context)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = theaterController
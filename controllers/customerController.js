const queries = require('../queries/customerQueries')

const customerController = {
  displayCustomers: async (req, res) => {

    let context = {}
    const mysql = req.app.get('mysql')
    try {
      context.customers = await queries.getCustomers(res, mysql)
      res.render('customers', context)
    } catch (err) {
      console.log(err)
    }
  },

  insertCustomers: async (req, res) => {
    const mysql = req.app.get('mysql')
    const inserts = [
      req.body.name,
      req.body.email,
      req.body.phone
    ]

    try {
      await queries.createCustomers(mysql, inserts)

      return res.redirect('/customers')
    } catch (err) {
      console.log(err)
    }
  },

  filterCustomers: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchCusBy
    const searchKeyword = '%' + req.query.searchCusName + '%'

    try {
      if (searchBy.length === 0) {
        context.customers = await queries.getCustomers(res, mysql)
      } else {
        context.customers = await queries.searchCustomers(res, mysql, searchKeyword)
      }

      res.render('customers', context)
    } catch (err) {
      console.log(err)
    }
  },

  deleteCus: async (req, res) => {
    const customer_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      await queries.deleteCustomer(res, mysql, customer_id)
      res.redirect('/customers')
    } catch (err) {
      console.log(err)
    }
  },

  getEditCus: async (req, res) => {
    let context = {}
    const customer_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.customers = await queries.getCustomers(res, mysql, customer_id)
      res.render('editCustomer', context)
    } catch (err) {
      console.log(err)
    }
  },

  editCus: async (req, res) => {
    const mysql = req.app.get('mysql')
    const updateInfo = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.params.id
    ]

    try {
      await queries.updateCus(res, mysql, updateInfo)

      return res.redirect('/customers')
    } catch (err) {
      console.log(err)
    }
  },

  getEditCus: async (req, res) => {
    let context = {}
    const customer_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.customer = await queries.getCus(res, mysql, customer_id)
      res.render('editCustomer', context)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = customerController
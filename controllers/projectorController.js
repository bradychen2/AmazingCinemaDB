const queries = require('../queries/projectorQueries')

const projectorController = {
  displayProjectors: async (req, res) => {

    let context = {}
    const mysql = req.app.get('mysql')

    try {
      context.projector = await queries.getProjectors(res, mysql)
      // console.log(context.projector)
      res.render('projectorEquipments', context)
    } catch (err) {
      console.log(err)
    }
  },

  insertProjectors: async (req, res) => {
    const mysql = req.app.get('mysql')
    const inserts = [
      req.body.type,
      req.body.ticket_price
    ]

    try {
      await queries.createProjectors(mysql, inserts)

      return res.redirect('/projectors')
    } catch (err) {
      console.log(err)
    }
  },

  filterProjectors: async (req, res) => {
    const mysql = req.app.get('mysql')
    let context = {}
    const searchBy = req.query.searchProjBy
    const searchKeyword = '%' + req.query.Bytype + '%'

    try {
      if (searchBy.length === 0) {
        context.projector = await queries.getProjectors(res, mysql)
      } else {
        context.projector = await queries.searchProjectors(res, mysql, searchKeyword)
      }
      res.render('projectorEquipments', context)
    } catch (err) {
      console.log(err)
    }
  },

  deleteProjectors: async (req, res) => {
    const projector_equipment_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      await queries.deleteProjector(res, mysql, projector_equipment_id)
      res.redirect('/projectors')
    } catch (err) {
      console.log(err)
    }
  },

  editPro: async (req, res) => {
    const mysql = req.app.get('mysql')
    const updateInfo = [
      req.body.type,
      req.body.ticket_price,
      req.params.id
    ]

    try {
      await queries.updateProjector(res, mysql, updateInfo)

      return res.redirect('/projectors')
    } catch (err) {
      console.log(err)
    }
  },

  getEditPro: async (req, res) => {
    let context = {}
    const projector_equipment_id = req.params.id
    const mysql = req.app.get('mysql')

    try {
      context.projector = await queries.getProjector(res, mysql, projector_equipment_id)
      res.render('editProjector', context)
    } catch (err) {
      console.log(err)
    }
  }


}

module.exports = projectorController
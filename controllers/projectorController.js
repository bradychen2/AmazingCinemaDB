const queries = require('../queries/projectorQueries')

const projectorController = {
  displayProjectors: (req, res) => {
    res.render('projectorEquipments')
  }
}

module.exports = projectorController
const queries = {
  getProjectors: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        `SELECT projector_equipment_id, type
          FROM Projector_Equipments;`,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          resolve(results)
        }
      )
    })
  },
}

module.exports = queries
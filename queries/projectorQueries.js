const sql_select =
  "SELECT projector_equipment_id, type FROM Projector_Equipments;";
const sql_insert =
  "INSERT INTO Projector_Equipments(type) VALUES(?);";
const sql_search =
  "SELECT projector_equipment_id, type FROM Projector_Equipments WHERE LOWER(type) LIKE LOWER(?);"
const update = "UPDATE Projector_Equipments SET type =? WHERE projector_equipment_id =?;"

const queries = {
  getProjectors: (res, mysql) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_select, function (error, results, fields) {
        if (error) {
          res.write(JSON.stringify(error));
          res.end();
        }
        resolve(results);
      });
    });
  },
  createProjectors: (mysql, inserts) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_insert, inserts, function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        resolve();
      })
    })
  },
  searchProjectors: ((res, mysql, searchKeyword) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(sql_search, searchKeyword,
        (error, results, fields) => {
          if (error) {
            res.write(JSON.stringify(error))
            res.end()
          }
          resolve(results)
        })
    })
  }),
  deleteProjector: (res, mysql, projector_equipment_id) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(
        "DELETE FROM Projector_Equipments WHERE projector_equipment_id = ?;",
        projector_equipment_id,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          resolve()
        })
    })
  },
  updateProjec: (res, mysql, updateInfo) => {
    return new Promise((resolve, reject) => {
      mysql.pool.query(update,
        updateInfo,
        (error, results, fields) => {
          if (error) {
            reject(error)
          }
          resolve()
        })
    })
  }


};
module.exports = queries

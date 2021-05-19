const sql_select = "SELECT customer_id, name, email, phone FROM Customers;"
const sql_insert = "INSERT INTO Customers(name, email, phone)VALUES(?,?,?);"
const sql_search = "SELECT customer_id, name, email, phone FROM Customers WHERE LOWER(name) LIKE LOWER(?);"
const queries = {
    getCustomers: (res, mysql) => {
        return new Promise((resolve, reject) => {
          mysql.pool.query(sql_select, function (error, results, fields) {
            if (error) {
              res.write(JSON.stringify(error))
              res.end()
            }
            resolve(results)
          })
        })
      },
    createCustomers: (mysql, inserts) => {
      return new Promise((resolve, reject) => {
        mysql.pool.query(sql_insert,inserts, function (error, results, fields) {
          if (error) {
            console.log(error);
          }
          resolve();
        });
      });
    },
    searchCustomers: ((res, mysql, searchKeyword) => {
      return new Promise((resolve, reject) => {
        mysql.pool.query(sql_search,searchKeyword,
          (error, results, fields) => {
            if (error) {
              res.write(JSON.stringify(error))
              res.end()
            }
            resolve(results)
          })
      })
    })
}

module.exports = queries
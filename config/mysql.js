const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cs340_project'
})

module.exports.pool = pool
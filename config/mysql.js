const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_chengpo',
  password: '****',
  database: 'cs340_chengpo'
})

module.exports.pool = pool

const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('./config/mysql')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
var app = express()

const port = 3000

app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('mysql', mysql)
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(
    `Express started on http://flip1.engr.oregonstate.edu:${port}; press Ctrl-C to terminate.`
  )
})

require('./routes')(app)

module.exports = app

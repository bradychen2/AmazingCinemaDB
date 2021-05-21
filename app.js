const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('./config/mysql')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
var app = express()

const port = 3000

app.engine('hbs', exphbs({
  helpers: require('./helpers/handlebarsHelpers'),
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('mysql', mysql)

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(
    `Express started on http://flip1.engr.oregonstate.edu:${port}; press Ctrl-C to terminate.`
  )
})

require('./routes')(app)

module.exports = app

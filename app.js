const express = require('express')
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mysql = require('./config/mysql')
const session = require('cookie-session')
const methodOverride = require('method-override')
var app = express()

const port = process.env.PORT

app.engine('hbs', exphbs({
  helpers: require('./helpers/handlebarsHelpers'),
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('mysql', mysql)

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(
    `Express started on http://flip1.engr.oregonstate.edu:${port}; press Ctrl-C to terminate.`
  )
})

require('./routes')(app)

module.exports = app

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/movies', (req, res) => {
  res.render('moviesAuditoriums')
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`)
})

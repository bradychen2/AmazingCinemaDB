const Handlebars = require('handlebars')

Handlebars.registerHelper('formatDate', (dayTime) => {
  // Need transform format when retrieve from SQL
  let recordDate = new Date(dayTime)
  let year = recordDate.getFullYear()
  let month = recordDate.getMonth() + 1
  let date = recordDate.getDate()

  if (month < 10) { month = '0' + month }
  if (date < 10) { date = '0' + date }

  return year + '-' + month + '-' + date
})

Handlebars.registerHelper('formatDateTime', (dayTime) => {
  let recordDate = new Date(dayTime)
  let year = recordDate.getFullYear()
  let month = recordDate.getMonth() + 1
  let date = recordDate.getDate()
  let hour = recordDate.getHours()
  let minute = recordDate.getMinutes()

  if (month < 10) { month = '0' + month }
  if (date < 10) { date = '0' + date }
  if (hour < 10) { hour = '0' + hour }
  if (minute < 10) { minute = '0' + minute }

  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
})
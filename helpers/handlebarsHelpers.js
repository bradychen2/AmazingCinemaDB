const Handlebars = require('handlebars')

Handlebars.registerHelper('formatDate', function (dayTime) {
  // Need transform format when retrieve from SQL
  let recordDate = new Date(dayTime)
  let year = recordDate.getFullYear()
  let month = recordDate.getMonth() + 1
  let date = recordDate.getDate()

  if (month < 10) { month = '0' + month }
  if (date < 10) { date = '0' + date }

  return year + '-' + month + '-' + date
})

Handlebars.registerHelper('formatDateTime', function (dayTime) {
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

Handlebars.registerHelper('formatDateTimeLocal', function (dayTime) {
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

  return year + '-' + month + '-' + date + 'T' + hour + ':' + minute
})

// Only works by declaring with 'function' keyword
Handlebars.registerHelper('if_eq', function (inputId, fkId, opts) {
  if (inputId === fkId) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
})

// Handlebars.registerHelper('renderNavbar', function () {
//   let title = document.getElementById('title').textContent.toLowerCase()
//   let pageList = ['movies', 'tickets', 'theaters', 'customers', 'projectors']
//   let listItems = `         
//         <li class="nav-item">
//           <a class="nav-link" aria-current="page" href="/movies">Movies&Auditoriums</a>
//         </li>`
//   if (title === pageList[0]) {
//     listItems = `         
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="/movies">Movies&Auditoriums</a>
//         </li>`
//   }

//   for (let i = 1; i < 5; i++) {
//     if (pageList[i] === title) {
//       listItems += `
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="/${pageList[i]}">
//           ${pageList[i].charAt(0).toUpperCase() + pageList[i].slice(1)}
//           </a>
//         </li>`
//     }
//     listItems += `
//         <li class="nav-item">
//           <a class="nav-link" aria-current="page" href="/${pageList[i]}">
//           ${pageList[i].charAt(0).toUpperCase() + pageList[i].slice(1)}
//           </a>
//         </li>`
//   }
// })

// Handlebars.registerHelper('includeExclude', function (entity1, entity2, opts) {
//   if (entity1 && !entity2) {
//     return opts.fn(this)
//   } else {
//     return opts.inverse(this)
//   }
// })

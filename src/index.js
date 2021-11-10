// const db = require('./config/db')

// const express = require('express')
// const app = express()

// const consign = require('consign')

// // Na app local
// // const path = require('path')
// // const CWD = path.join(__dirname)

// // No heroku
// const CWD = process.cwd() + '/app'

// // consign({ cwd: CWD })
// //     .include('./config/passport.js')
// //     .then('./config/middlewares.js')
// //     .then('./api')
// //     .then('./config/routes.js')
// //     .into(app)

// app.use(express.static('public'))

// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//     console.log(`Backend executando... na porta ${PORT}`)
// })

const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
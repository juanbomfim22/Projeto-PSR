// const db = require('./config/db')
// // const consign = require('consign')
// const express = require("express")

// const app = express()

// // Na app local
// // const path = require('path')
// // const CWD = path.join(__dirname)

// // No heroku
// // const CWD = process.cwd() + '/app'

// // consign({ cwd: CWD })
// //     .include('./config/passport.js')
// //     .then('./config/middlewares.js')
// //     .then('./api')
// //     .then('./config/routes.js')
// //     .into(app)

// // app.use(express.static("public"))
// app.get("/", function (req, res) {
//     res.send("<h1>Hello World!</h1>")
//   })

// app.listen(process.env.PORT || 3000, 
// 	() => console.log("Server is running..."));

const express = require("express")
const app = express()

// use the express-static middleware
// app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!" + process.cwd() + "</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
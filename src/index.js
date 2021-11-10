// const db = require('./config/db')

// const express = require('express')
// const app = express()

// const path = require('path');
// const consign = require('consign')

// consign({ cwd: path.join(__dirname)})
//     .include('./config/passport.js')
//     .then('./config/middlewares.js')
//     .then('./api')
//     .then('./config/routes.js')
//     .into(app)

// app.db = db
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
const consign = require("consign")
const express = require("express")
const app = express()

const db = require('./config/db.js')
app.db = db

// use the express-static middleware
app.use(express.static("public"))

consign({cwd: process.cwd() + '/src'})
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

 
// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
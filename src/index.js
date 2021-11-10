const consign = require("consign")
const express = require("express")
const app = express()

// const db = require('./src/config/db.js')
// app.db = db

// use the express-static middleware
app.use(express.static("public"))

consign()
    .include('src/config/passport.js')
    .then('src/config/middlewares.js')
    .then('src/api')
    .then('src/config/routes.js')
    .into(app)

    
// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
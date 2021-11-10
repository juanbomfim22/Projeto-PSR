const db = require('./config/db')
// const consign = require('consign')
const express = require("express")

const app = express()

// Na app local
// const path = require('path')
// const CWD = path.join(__dirname)

// No heroku
// const CWD = process.cwd() + '/app'

// consign({ cwd: CWD })
//     .include('./config/passport.js')
//     .then('./config/middlewares.js')
//     .then('./api')
//     .then('./config/routes.js')
//     .into(app)

// app.use(express.static("public"))
app.get('/', (req, res) => res.send(`<h1>${12}</h1>`))

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
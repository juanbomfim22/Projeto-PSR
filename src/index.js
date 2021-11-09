const db = require('./config/db')

const express = require('express')
const app = express()

const path = require('path');
const consign = require('consign')

consign({ cwd: path.join(__dirname)})
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db = db
app.use(express.static('public'))

app.listen(process.env.PORT || 3000, () => {
    console.log('Backend executando... na porta 3000')
})
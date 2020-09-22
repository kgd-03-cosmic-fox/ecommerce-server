const express = require('express')
const app = express()
const routes = require('./router')
var cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(routes)

module.exports = app

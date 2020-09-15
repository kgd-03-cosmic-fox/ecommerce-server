const express = require('express')
const app = express()
const routes = require('./router')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(routes)


module.exports = app

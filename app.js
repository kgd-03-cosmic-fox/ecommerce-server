if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// require('dotenv').config()
// const port = 3007 || process.env.PORT
const express = require('express')
const app = express()
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')
// const port = process.env.PORT
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(routes)
app.use(errorHandler)
module.exports = app

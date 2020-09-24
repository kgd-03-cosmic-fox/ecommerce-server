if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')
const port = process.env.PORT
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/',routes)
app.use(errorHandler)
app.listen(port,()=> {
  console.log(`listening on port ${port}`)
})
module.exports = app

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')
const port = process.env.PORT
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.listen(port,()=> {
  console.log(`listening on port ${port}`)
})
app.use('/',routes)
app.use(errorHandler)
module.exports = app

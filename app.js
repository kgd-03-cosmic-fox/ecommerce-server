const express = require('express')
const app = express()
const routes = require('./routes/index.js')
require('dotenv').config()
const errorHandler = require('./middlewares/errorHandler.js')
// const port = 3007
// const cors = require('cors')
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// app.listen(port,()=> {
//   console.log(`listening on port ${port}`)
// })
app.use('/',routes)
app.use(errorHandler)
module.exports = app

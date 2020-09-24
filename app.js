if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
  }

// require('dotenv').config() // Matiin saat ingin deploy

const express = require(`express`)
const app = express()
const port = process.env.PORT
const routerIndex = require(`./router/index`)
const cors = require(`cors`)
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(`/`, routerIndex)

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`App listening at port:${port}`)
})

module.exports = app
const express = require(`express`)
const app = express()
const routerIndex = require(`./router/index`)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(`/`, routerIndex)

module.exports = app
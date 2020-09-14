const express = require(`express`)
const app = express()
const routerIndex = require(`./router/index`)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(`/`, routerIndex)
// app.use((err,req,res,next)=>{
//     if(err.name===){}
// })

module.exports = app
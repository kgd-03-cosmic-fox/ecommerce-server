const app = require('../app')
require('dotenv').config()

let port = 3001

app.listen(port , ()=>{
    console.log(`listening in port ${port}`)
})
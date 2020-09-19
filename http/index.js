const app = require('../app')

let port = process.env.PORT

app.listen(port , ()=>{
    console.log(`listening in port ${port}`)
})
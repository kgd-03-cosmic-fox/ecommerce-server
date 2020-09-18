const { JsonWebTokenError } = require("jsonwebtoken")

function errorHandler(err , req , res , next){
    console.log(err)
    let message = ''
    status = err.status || 500
    
    if(err.name === 'SequelizeValidationError'){

        let dummyMessage = []

        status = 400
        
            err.errors.forEach(el=>{
                let checkErr = false
            
                for(let i = 0 ; i < dummyMessage.length ; i++){
                    if(dummyMessage[i] == el.message){
                        checkErr = true
                    }
                }

                if(!checkErr){
                    dummyMessage.push(el.message)
                }

            })
        dummyMessage = dummyMessage.sort()
        message = dummyMessage.join(' , ')


    }else if(status === 500){
        message = 'Internal Server Error'
    } 

    if(!message){
        message = err.message
    }

    res.status(status).json({message})

}

module.exports = errorHandler
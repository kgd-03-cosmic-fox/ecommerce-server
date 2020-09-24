const jwt = require('jsonwebtoken')
const {User} = require('../models')

function authenticate(req , res , next){

    if(req.headers.access_token){

        try {

            let decoded = jwt.verify(req.headers.access_token, process.env.SECRET_KEY)

            if(decoded){
                req.isLoggedIn = decoded

                User.findOne({
                    where : {
                        id : req.isLoggedIn.id
                    }
                })
                .then(data=>{
                    if(data){
                        next()
                    }else{
                        next({status : 401 , message : 'Not Authenticate'})            
                    }
                })
            }else{
                next({status : 401 , message : 'Not Authenticate'})
            }
        }
        catch(e){
            next({status : 401 , message : 'Not Authenticate'})
        }
    }
    else{
        next({status : 401 , message : 'Not Authenticate'})
    }

}

module.exports = authenticate
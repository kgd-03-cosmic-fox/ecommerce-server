const jwt = require('jsonwebtoken')

function authenticate(req , res , next){

    if(req.headers.access_token){
        try {

            let decoded = jwt.verify(req.headers.access_token, 'ApAjAdAh')

            if(decoded){
                req.isLoggedIn = decoded
                next()
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
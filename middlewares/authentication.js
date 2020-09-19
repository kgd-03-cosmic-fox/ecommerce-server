const jwt = require(`jsonwebtoken`)
// require('dotenv').config()

function authentication(req,res,next){

    if(!req.headers.access_token){
        res.status(401).json({
            err:"Failed to authenticate"
        })
    }
    else{
        try{
            const payload = jwt.verify(req.headers.access_token,process.env.JWT_SECRET_KEY)
            req.loggedInUser = payload
            next()
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = authentication
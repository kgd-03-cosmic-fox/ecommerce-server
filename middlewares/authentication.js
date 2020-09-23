const jwt = require(`jsonwebtoken`)
const { User } = require(`../models`)

function authentication(req,res,next){

    if(!req.headers.access_token){
        res.status(401).json({
            err:"Failed to authenticate"
        })
    }
    else{
        try{
            const payload = jwt.verify(req.headers.access_token,process.env.JWT_SECRET_KEY)
            User.findOne({
                where:{
                    id: payload.id
                }
            })
            .then(user=>{
                if(user){
                    req.loggedInUser = payload
                    next()
                }
                else{
                    res.status(401).json({
                        message: "Failed to authenticate"
                    })
                }
            })
            .catch(_=>{
                res.status(401).json({
                    err:"Failed to authenticate"
                })
            })
        }
        catch(err){
            res.status(401).json({
                err:"Failed to authenticate"
            })
        }
    }
}

module.exports = authentication
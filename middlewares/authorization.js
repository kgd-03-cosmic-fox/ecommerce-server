function authorization(req,res,next){
    if(req.loggedInUser.isAdmin==false){
        res.status(401).json({
            err: "Unauthorized"
        })
    }
    else{
        next()

    }
}

module.exports = authorization
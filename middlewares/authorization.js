function authorization(req,res,next){
    if(req.loggedInUser.isAdmin == true){
        next()
    }
    else{
        res.status(401).json({
            err: "Unauthorized"
        })
    }
}

module.exports = authorization
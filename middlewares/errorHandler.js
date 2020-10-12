function errorHandler(err,req,res,next){
    let errors = []
    let statusCode = 500
    switch (err.name) {
        case "SequelizeValidationError":
            err.errors.forEach((el)=>{
                errors.push(el.message)
            })
            statusCode = 400 
            break;
        case "SequelizeUniqueConstraintError":
            err.errors.forEach((el)=>{
                errors.push(el.message)
            })
            statusCode = 400 
            break;
        default:
            errors.push(err.message || "Internal server error")
            break;
    }
    res.status(statusCode).json({errors})
}


module.exports = errorHandler
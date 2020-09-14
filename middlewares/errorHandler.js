module.exports = function(err,req,res,next){
  if(err.name === 'SequelizeValidationError'){
    res.status(400).json({
      message:err.errors[0].message
    })
  }
}

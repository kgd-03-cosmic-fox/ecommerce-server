const { User } = require('../models')
const jwt = require('jsonwebtoken')
function authorization(req,res,next){
  try{
    const payload = jwt.verify(req.headers.access_token,process.env.SECRET_KEY)
    User.findOne({
      where:{
        email:payload.email
      }
    })
    .then(user =>{
      if(user.role == 'admin'){
        next()
      }
      else{
        res.status(401).json({
          message:'Unauthorize Access'
        })
      }
    })
    .catch(err =>{
      console.log(err)
      res.send(err)
    })
  }
  catch(err){
    console.log(err)
    res.send(err)
  }
}
module.exports = authorization

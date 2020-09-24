const {User} = require('../models')

function authorization(req , res , next){

    User.findOne({
        where :{
            id : req.isLoggedIn.id
        }
    })
    .then(data=>{

        if(data.role === 'admin'){
            next()
        }else{
            next({status : 401 , message : 'Not Authorize'})
        }
    })
    .catch(next)

}

module.exports = authorization
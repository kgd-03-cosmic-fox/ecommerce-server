const {User} = require(`../models`)

class Controller{
    static postRegister(req,res,next){
        User.create({
            email:req.body.email,
            password:req.body.password
        })
        .then(user=>{
            res.status(201).json({
                messaage:`Hi ${user.name}, your account is successfully registered`,
                id:user.id,
                email:user.email
            })
        })
        .catch(err=>{
            res.status(500).json({
                err:"Internal server error"
            })
        })
    }
}

module.exports = Controller
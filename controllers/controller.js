const {User} = require(`../models`)
const bcrypt = require('bcryptjs')
const jwt = require(`jsonwebtoken`)

class Controller{
    static postRegister(req,res,next){
        User.create({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        .then(user=>{
            res.status(201).json({
                message:`Hi ${user.name}, your account is successfully registered`,
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
    static postLogin(req,res){
        if(!req.body.email){
            res.status(400).json({
                message:"email can't be null"
            })
        }
        else if(!req.body.password){
            res.status(400).json({
                message:"password can't be null"
            })
        }
        else{
            User.findOne({
                where:{
                    email:req.body.email,
                }
            })
            .then(data=>{
                if(data){
                    if(bcrypt.compareSync(req.body.password,data.password)){
                        const token = jwt.sign({name:data.name,email:data.email},"secret")
                        res.status(201).json({
                            message:"Login Success",
                            token
                        })
                    }
                    else{
                        res.status(400).json({
                            message:"Invalid email/password"
                        })
                    }
                }
                else{
                    res.status(400).json({
                        message:"Invalid email/password"
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Internal server error"
                })
            })
        }
    }
    
}

module.exports = Controller
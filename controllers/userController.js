const {User, Cart} = require(`../models`)
const bcrypt = require('bcryptjs')
const jwt = require(`jsonwebtoken`)
require('dotenv').config()

class Controller{
    static postRegister(req,res,next){
        User.create({
            name: req.body.name,
            email:req.body.email,
            isAdmin:false,
            password:req.body.password
        })
        .then(user=>{
            return Cart.create({
                UserId: user.id
            })
            .then(_=>{
                res.status(201).json({
                    message:`Hi ${user.name}, your account is successfully registered`,
                    id:user.id,
                    email:user.email
                })
            })
            .catch(err=>{
                next(err)
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    static postLogin(req,res) { //diganti yah jangan disini validasinya
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
                        const token = jwt.sign({
                            id:data.id,
                            name:data.name,
                            email:data.email,
                            isAdmin:data.isAdmin
                        },process.env.JWT_SECRET_KEY)

                        res.status(201).json({
                            message:"Login Success",
                            token,
                            name: data.name
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
const {User, Cart} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{

    static login(req , res , next){

        if(req.body.email && req.body.password){
            User.findOne({
                where : {
                    email : req.body.email
                }
            })
            .then(data=>{
                
                if(data){
    
                    const salt = bcrypt.genSaltSync(10);
    
                    let checkPassword = bcrypt.compareSync(req.body.password , data.password)
    
                    if(checkPassword){
                        

                        let access_token = jwt.sign({ id : data.id , email : data.email} , process.env.SECRET_KEY)
    
                        res.status(200).json({
                            access_token,
                            id : data.id,
                            email : data.email
                        })
    
                    }else{
                        next({status : 404 , message : 'Invalid Email / Password' })
                    }
    
                }else{
                    next({status : 404 , message : 'Invalid Email / Password' })
                }
    
            })
            .catch(next)
        }else{
            next({status : 404 , message : 'Invalid Email / Password' })
        }
        
    }

    static loginCust (req, res, next){
        // kayaknya bisa pake login yang sama?
    }

    static register (req, res, next) {

        User.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(data => {

            return Cart.create({
                UserId : data.id
            })

        })
        .then(data => {

            res.status(201).json({message: 'Register Success, please try to Login!'})

        })
        .catch(next)
    }
    
}

module.exports = UserController
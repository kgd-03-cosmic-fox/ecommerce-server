const { Product } = require('../models')

class ProductController{

    static postProduct(req , res , next){

        Product.create({
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        })
        .then(data=>{

            res.status(201).json({message : 'Product Has been Created'})

        })
        .catch(next)
    }

    static putProduct(req , res , next){

        Product.findOne({
            where : {
                id : req.params.id 
            }
        })
        .then(data=>{
            if(!data){
                next({status : 404 , message : 'Data Not Found'})
            }else{

                return Product.update({
                    name : req.body.name,
                    image_url : req.body.image_url,
                    price : req.body.price,
                    stock : req.body.stock
                },{
                    where:{
                        id : req.params.id
                    }
                })
                .then(data=>{
        
                    res.status(200).json({message : 'Data has been Updated'})
        
                })
            }
        })
        .catch(next)
    }

    static deleteProduct(req , res , next){

        Product.findOne({
            where : {
                id : req.params.id 
            }
        })
        .then(data=>{
            if(!data){
                next({status : 404 , message : 'Data Not Found'})
            }else{

                return Product.destroy({
                    where : {
                        id : req.params.id
                    }
                })
                .then(data=>{
        
                    res.status(200).json({message : 'Delete Success'})
        
                })
            }
        })
        .catch(next)

    }

}

module.exports = ProductController
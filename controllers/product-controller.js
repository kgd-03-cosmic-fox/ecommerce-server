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

}

module.exports = ProductController
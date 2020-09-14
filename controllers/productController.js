const {Product} = require(`../models`)


class ProductController{
    static postNewProduct(req,res){
        Product.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock
        })
        .then(product=>{
            res.status(201).json({
                message:"Success creating new product",
                id:product.id,
                name:product.name,
                price:product.price,
                stock:product.stock
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Internal server error"
            })
        })
    }
}

module.exports = ProductController
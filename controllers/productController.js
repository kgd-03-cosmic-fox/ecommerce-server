const {Product} = require(`../models`)


class ProductController{
    static postNewProduct(req,res,next){
        Product.create({
            name: req.body.name,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            category: req.body.category,
            imgUrl: req.body.imgUrl
        })
        .then(product=>{
            res.status(201).json({
                message:"Success creating new product",
                id:product.id,
                name:product.name,
                price:product.price,
                stock:product.stock,
                category:product.category
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    static putProduct(req,res,next){
        Product.findOne({
            where:{
                id:req.params.id
            }
        })
        .then(data=>{
            if(data){
                Product.update({
                    name: req.body.name,
                    price: Number(req.body.price),
                    stock: Number(req.body.stock),
                    category: req.body.category
                },{
                    where:{
                        id:req.params.id
                    }
                })
                .then(_=>{
                    res.status(201).json({
                        message: "Success updating product"
                    })
                })
                .catch(err=>{
                    next(err)
                })
            }
            else{
                res.send(404).json({
                    message:"Not found Error 404"
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static getAllProduct(req,res,next) {
        Product.findAll()
        .then(products=>{
            res.status(200).json({
                products
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    static getProductById (req,res,next){
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(product=>{
            if(product){
                res.status(200).json({
                    product
                })
            }
        })
    }
    static deleteProduct(req,res,next){
        Product.findOne({
            where:{
                id:req.params.id
            }
        })
        .then(data=>{
            if(data){
               Product.destroy({
                    where:{
                        id:req.params.id
                    }
                })
                .then(_=>{
                    res.status(201).json({
                        message: "Success deleting product"
                    })
                })
                .catch(err=>{
                    next(err)
                })
            }
            else{
                res.send(404).json({
                    message:"Not found Error 404"
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ProductController
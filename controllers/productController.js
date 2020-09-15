const {Product} = require(`../models`)
const product = require("../models/product")


class ProductController{
    static postNewProduct(req,res,next){
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
                    price: req.body.price,
                    stock: req.body.stock
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
                    console.log("ini dari IF")
                    res.status(201).json({
                        message: "Success deleting product"
                    })
                })
                .catch(err=>{
                    next(err)
                })
            }
            else{
                console.log("ini dari ELSE")
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
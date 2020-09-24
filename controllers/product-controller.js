const { Product } = require('../models')
class ProductController{
  static postProduct(req,res,next){
    Product.create({
      name:req.body.name,
      image_url:req.body.image_url,
      price:Number(req.body.price),
      stock:Number(req.body.stock)
    })
    .then(data =>{
      res.status(201).json({
        message:'Item Has Added',
        name:req.body.name
      })
    })
    .catch(err =>{
      next(err)
      console.log(err)
    })
  }
  static getProduct(err,res,next){
    Product.findAll({
      attributes:{
        exclude: ['createdAt','updatedAt']
      }
    })
    .then(product =>{
      res.status(200).json(product)
    })
    .catch(err =>{
      next(err)
    })
  }
  static putProduct(req,res,next){
    Product.update({
        name:req.body.name,
        price:Number(req.body.price),
        stock:Number(req.body.stock)
      }
    ,{
      where:{
        id:req.params.id
      }
    })
      .then(data =>{
        res.status(201).json({
          message:'Data has been updated'
        })
      })
      .catch(err =>{
        next(err)
        console.log(err)
      })
  }
  static deleteProduct(req,res,next){
    Product.destroy({
      where:{
        id:req.params.id
      }
    })
    .then(data =>{
      res.status(200).json({
        message:'Data Has been delete'
      })
    })
    .catch(err =>{
      next(err)
      console.log(err)
    })
  }
  static getById(req,res,next){
    Product.findOne({
      where:{
        id:req.params.id
      }
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err =>{
      next(err)
    })
  }
}
module.exports = ProductController

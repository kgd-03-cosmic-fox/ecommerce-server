const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app.js')
const { User,Product } = require('../models')
let admToken;
let nonAdmToken;
let nonAdmUser = {
  name:'user1',
  email:'user1@mail.com',
  password:'123456',
  role:'user'

}
let dummyProduct = {
  name:'Topi',
  image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
  price:25000,
  stock:5
}
let dummyProductId;
describe("Product Routes", () =>{
  beforeAll((done) =>{
    User.create({
      name:nonAdmUser.name,
      email:nonAdmUser.email,
      password:nonAdmUser.password,
      role:nonAdmUser.role
    })
    .then(data =>{
      nonAdmToken = jwt.sign({email:nonAdmUser.email,role:nonAdmUser.role},process.env.SECRET_KEY)
      return User.findOne({
        where:{
          role:'admin'
        }
      })
      .then(user =>{
        admToken = jwt.sign({id:user.id,email:user.email,role:user.role},process.env.SECRET_KEY)
        return Product.create({
          name:dummyProduct.name,
          image_url:dummyProduct.image_url,
          price:dummyProduct.price,
          stock:dummyProduct.stock
        })
        .then(data =>{
          return Product.findOne({
            where:{
              name:dummyProduct.name
            }
          })
          .then(product =>{
            dummyProductId = product.id
            done()
          })
        })
      })
    })
    .catch(err =>{
      done(err)
    })
  })
  describe("Post /products",() =>{
    describe("Success when adding products",() =>{
      test("adding item with correct token",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:5
        })
        .set('access_token',admToken)
        .expect(201)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Item Has Added')
            done()
          }
        })
      })
    })
    describe("Error while adding products",() =>{
      test("when adding item with null url value",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:"sneakers",
          image_url:'',
          price:300000,
          stock:5
        })
        .set('access_token',nonAdmToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Url Cannot be leave empty')
            done()
          }
        })
      })
      test("adding item with null item name",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:'',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:300000,
          stock:5
        })
        .set('access_token',nonAdmToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Item Name Cannot be leave empty')
            done()
          }
        })
      })
      test("adding item with minus price value",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:"sneakers",
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:-1,
          stock:5
        })
        .set('access_token',nonAdmToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Price cannot be filled with negative numbers')
            done()
          }
        })
      })
      test("adding item with minus stock value",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:"sneakers",
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:-2
        })
        .set('access_token',nonAdmToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Stock cannot be filled with negative numbers')
            done()
          }
        })
      })
      test("adding item with different DataTypes of name",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:94352,
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:300000,
          stock:5
        })
        .set('access_token',nonAdmToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Invalid value of DataTypes name')
            done()
          }
        })
      })
      test("adding item with different DataTypes of price",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:'asdasd',
          stock:5
        })
        .set('access_token',nonAdmToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Invalid DataTypes of price')
            done()
          }
        })
      })
      test("adding item with different DataTypes of stock",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:'sdhas'
        })
        .set('access_token',nonAdmToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Invalid DataTypes of stock')
            done()
          }
        })
      })
      test("adding item without access_token",(done) =>{
        request(app)
        .post('/items')
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:5
        })
        .expect(401)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Auth Fail')
            done()
          }
        })
      })
    })
  })
  describe("Put /products",() =>{
    describe("when success editing Data",()=>{
      test("success updating data",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'sepatu',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:5
        })
        .set('access_token',admToken)
        .expect(201)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Data has been updated')
            done()
          }
        })
      })
    })
    describe("when Fail editing data",()=>{
      test("Fail updating data cz access_token = null",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'sepatu',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:5
        })
        .expect(401)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Auth Fail')
            done()
          }
        })
      })
      test("Fail updating data cz access_token = not admin",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'sepatu',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:5
        })
        .set('access_token',nonAdmToken)
        .expect(401)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Unauthorize Access')
            done()
          }
        })
      })
      test("Fail updating data cz image_url null",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:"sneakers",
          image_url:'',
          price:300000,
          stock:5
        })
        .set('access_token',admToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Url Cannot be leave empty')
            done()
          }
        })
      })
      test("Fail updating data cz null value of name",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:5
        })
        .set('access_token',admToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Item Name Cannot be leave empty')
            done()
          }
        })
      })
      test("Fail updating data cz negative value of price",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'Sepatu',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:-500,
          stock:5
        })
        .set('access_token',admToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Price cannot be filled with negative numbers')
            done()
          }
        })
      })
      test("Fail updating data cz negative value of stock",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'Sepatu',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:-55
        })
        .set('access_token',admToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Stock cannot be filled with negative numbers')
            done()
          }
        })
      })
      test("Fail updating item with not string value",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:94352,
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:300000,
          stock:5
        })
        .set('access_token',admToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Invalid value of DataTypes name')
            done()
          }
        })
      })
      test("Fail update : price = string",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:'asdasd',
          stock:5
        })
        .set('access_token',admToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Invalid DataTypes of price')
            done()
          }
        })
      })
      test("Fail update : stock = string",(done) =>{
        request(app)
        .put(`/items/${dummyProductId}`)
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:'sdhas'
        })
        .set('access_token',admToken)
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Invalid DataTypes of stock')
            done()
          }
        })
      })
    })
  })
  describe("Delete /Products/:id",() =>{
    describe("when success deleting product",() =>{
      test("when success delete product",(done) =>{
        request(app)
        .delete(`/items/${dummyProductId}`)
        .expect(200)
        .set('access_token',admToken)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Data Has been delete')
            done()
          }
        })
      })
    })
    describe("When Fail Deleting Product",() =>{
      test("when Fail delete product without access_token",(done) =>{
        request(app)
        .delete(`/items/${dummyProductId}`)
        .expect(401)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Auth Fail')
            done()
          }
        })
      })
      test("when Fail delete product with user access_token",(done) =>{
        request(app)
        .delete(`/items/${dummyProductId}`)
        .set('access_token',nonAdmToken)
        .expect(401)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Unauthorize Access')
            done()
          }
        })
      })
    })
  })
  afterAll((done) =>{
    Product.destroy({
      where:{},
      truncate:true
    })
    .then(data =>{
      console.log('item has been cleared')
      return User.destroy({
        where:{
          name:'user1'
        }
      })
      .then(user =>{
        console.log('User Has Been Delete')
        done()
      })
    })
    .catch(err =>{
      console.log(err)
      done(err)
    })
  })
})

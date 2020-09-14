const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app.js')
const { User,Product } = require('../models')
describe("Product Routes", () =>{
  // beforeAll((done) =>{
  //   test("with authorization request",() =>{
  //     request(app)
  //     .post(login)
  //   })
  // })
  // describe("put /products/:id",() =>{
  //   describe("Success when updating products",() =>{
  //
  //   })
  //   describe("Error while updating products",() =>{
  //
  //   })
  // })
  // describe("destroy /products/:id",() =>{
  //   describe("Success when destroy products",() =>{
  //
  //   })
  //   describe("Error while destroy products",() =>{
  //
  //   })
  // })
  describe("Post /products",() =>{
    describe("Success when adding products",() =>{
      test("When success adding product",(done) =>{
        request(app)
        .post('/')
        .send({
          name:"sneakers",
          image_url:"https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg",
          price:300000,
          stock:5
        })
        .expect(201)
        .end(function(err,res){
          console.log('Error on')
          console.log(res.body)
          if(err){
            done(err)
          }
          else{
            expect(res.body.name).toBe('sneakers')
            expect(res.body.message).toBe('Item Has Added')
            done()
          }
        })
      })
    })
    describe("Error while adding products",() =>{
      test("when adding item with null url value",(done) =>{
        request(app)
        .post('/')
        .send({
          name:"sneakers",
          image_url:'',
          price:300000,
          stock:5
        })
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            console.log(res.body)
            expect(res.body.message).toBe('Url Cannot be leave empty')
            done()
          }
        })
      })
      test("adding item with null item name",(done) =>{
        request(app)
        .post('/')
        .send({
          name:'',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:300000,
          stock:5
        })
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
        .post('/')
        .send({
          name:"sneakers",
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:-1,
          stock:5
        })
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
        .post('/')
        .send({
          name:"sneakers",
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:-2
        })
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            console.log('ini stock loh')
            console.log(res.body)
            expect(res.body.message).toBe('Stock cannot be filled with negative numbers')
            done()
          }
        })
      })
      test("adding item with different DataTypes of name",(done) =>{
        request(app)
        .post('/')
        .send({
          name:94352,
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:300000,
          stock:5
        })
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
        .post('/')
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:'asdasd',
          stock:5
        })
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
        .post('/')
        .send({
          name:'sneakers',
          image_url:'https://images-na.ssl-images-amazon.com/images/I/61xF2IjNvZL._UY500_.jpg',
          price:50000,
          stock:'sdhas'
        })
        .expect(400)
        .end(function(err,res){
          if(err){
            done(err)
          }
          else{
            console.log('ini stock loh')
            console.log(res.body)
            expect(res.body.message).toBe('Invalid DataTypes of stock')
            done()
          }
        })
      })
      test.only("adding item without access_token",(done) =>{
        request(app)
        .post('/')
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
    afterAll((done) =>{
      Product.destroy({
        where:{},
        truncate:true
      })
      .then(data =>{
        console.log(data)
        console.log('item has been cleared')
        done()
      })
      .catch(err =>{
        console.log(err)
        done(err)
      })
    })
  })
})

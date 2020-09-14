const request = require('supertest')
const app = require('../app.js')
const {Product} = require('../models')

describe('Product Router' , ()=>{

    describe('Create Product' , ()=>{
        
        afterAll(()=>{
            Product.destroy({
                where : {},
                truncate : true
            })
        })

        describe('Success Test Case' , () =>{
            
            test('should create success product response' , (done)=>{
                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : 100000,
                    stock : 3
                })
                .set('access_token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MDAwOTY4MDZ9.vPKT7xMofB0sfbVb5-btM6dka0hlXlwBul1Rh7TK3Es')
                .expect(201)
                .end(function(err , res){
                    expect(res.body).toHaveProperty('message' , 'Product Has been Created')
                    done()
                })
            })
            
        })

        describe('Fail Test Case' , () =>{
            
            test('all data empty' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : '',
                    image_url : '',
                    price : '',
                    stock : ''
                })
                .set('access_token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MDAwOTY4MDZ9.vPKT7xMofB0sfbVb5-btM6dka0hlXlwBul1Rh7TK3Es')
                .expect(400)
                .end(function(err , res){
                    expect(res.body).toHaveProperty('message' , 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only')
                    done()
                })

            })

            test('Price & Stock less than 0' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : -10000,
                    stock : -1
                })
                .set('access_token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MDAwOTY4MDZ9.vPKT7xMofB0sfbVb5-btM6dka0hlXlwBul1Rh7TK3Es')
                .expect(400)
                .end(function(err , res){
                    expect(res.body).toHaveProperty('message' , 'price / stock cannot less than 0 and numbers only')
                    done()
                })

            })

            test('image_url not url' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'blackcloth.jph',
                    price : 10000,
                    stock : 1
                })
                .set('access_token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MDAwOTY4MDZ9.vPKT7xMofB0sfbVb5-btM6dka0hlXlwBul1Rh7TK3Es')
                .expect(400)
                .end(function(err , res){
                    expect(res.body).toHaveProperty('message' , 'img_url must be url')
                    done()
                })

            })

            test('name empty , not url , price / stock < 0 & string' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : '',
                    image_url : 'blackcloth.jph',
                    price : -50,
                    stock : 'one'
                })
                .set('access_token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MDAwOTY4MDZ9.vPKT7xMofB0sfbVb5-btM6dka0hlXlwBul1Rh7TK3Es')
                .expect(400)
                .end(function(err , res){
                    expect(res.body).toHaveProperty('message' , 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only')
                    done()
                })

            })

            test('Invalid Access Token' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : 1000,
                    stock : 3
                })
                .set('access_token' , 'abcdef')
                .expect(401)
                .end(function(err , res){
                    expect(res.body).toHaveProperty('message' , 'Not Authenticate')
                    done()
                })

            })

            test('Not Admin' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jph',
                    price : 50,
                    stock : 1
                })
                .set('access_token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2MDAwOTY4MDZ9.vPKT7xMofB0sfbVb5-btM6dka0hlXlwBul1Rh7TK3Es')
                .expect(401)
                .end(function(err , res){
                    expect(res.body).toHaveProperty('message' , 'Not Authorize')
                    done()
                })

            })

        })

    })
})
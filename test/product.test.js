const request = require('supertest')
const app = require('../app.js')
const {Product , User} = require('../models')
const jwt = require('jsonwebtoken')

describe('Product Router' , ()=>{
    let idProduct
    let validTokenAdmin
    let validTokenCustomer

    let userAdmin = {
        email: 'admin@email.com',
        password: '1234',
        role: 'admin'
    }

    let userCustomer = {
        email: 'test@email.com',
        password: '1234',
        role: 'customer'
    }

    beforeAll((done)=>{
        
        Product.create({
                name : 'Black T-Shirt',
                image_url : 'http://blackcloth.jpg',
                price : 100000,
                stock : 3
        })
        .then(data=>{
            idProduct = data.id
            return User.create(
                userAdmin
            )
        })
        .then(data=>{
            validTokenAdmin = jwt.sign({ id : data.id , email : data.email} , process.env.SECRET_KEY)
            console.log(validTokenAdmin)
            return User.create(
                userCustomer
            )
        })
        .then(data=>{
            validTokenCustomer = jwt.sign({ id : data.id , email : data.email} , process.env.SECRET_KEY)
            console.log(validTokenCustomer)
            done()
        })
        .catch(err=>{
            console.log(err)
            done(err)
        })
    })

    afterAll((done)=>{
        Product.destroy({
            where : {},
            truncate : true
        })
        .then(_=>{
            return User.destroy({
                where: {},
                truncate: true
            })
        })
        .then(_=>{
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
    
    describe('Create Product' , ()=>{
        
        describe('Success Test Case' , () =>{
            
            test('should create success product response' , (done)=>{
                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVz6nwpjdd_p8dmhSJhjkQgzH6Gqv5Mm5SYuAKIxQE_mf-GMMfdzweZHlqA6HtglXnp32Sa74&usqp=CAc.JPG',
                    price : 100000,
                    stock : 3
                })
                .set('access_token' , validTokenAdmin)
                .expect(201)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Product Has been Created')
                        done()
                    }

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
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only')
                        done()
                    }
                })

            })
            
            test('Price less than 0' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : -10000,
                    stock : 10
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'price / stock cannot less than 0 and numbers only')
                        done()
                    }
                })

            })

            test('Stock less than 0' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : 10000,
                    stock : -10
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'price / stock cannot less than 0 and numbers only')
                        done()
                    }
                })
            })

            test('Price is string' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : 'One Hundred',
                    stock : 10
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'price / stock cannot less than 0 and numbers only')
                        done()
                    }
                })

            })

            test('Stock is String' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : 10000,
                    stock : 'Ten'
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'price / stock cannot less than 0 and numbers only')
                        done()
                    }
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
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{                        
                        expect(res.body).toHaveProperty('message' , 'img_url must be url')
                        done()
                    }
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
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only')
                        done()
                    }
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
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authenticate')
                        done()
                    }
                })

            })

            test('No Access Token' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : 1000,
                    stock : 3
                })
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authenticate')
                        done()
                    }
                })

            })

            test('Not Admin' , (done)=>{

                request(app)
                .post('/products')
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : 50,
                    stock : 1
                })
                .set('access_token' , validTokenCustomer)
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authorize')
                        done()
                    }
                })

            })

        })

    })

    describe('Update Product' , ()=>{

        describe('Success Update Case' , ()=>{

            test('should create success product response' , (done)=>{
                
                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : 'Black T-Shirt V-2',
                    image_url : 'http://blackcloth.jpg',
                    price : 1000000,
                    stock : 10
                })
                .set('access_token' , validTokenAdmin)
                .expect(200)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Data has been Updated')
                        done()
                    }
                })

            })

        })
        
        describe('Failed Update Case' , () =>{

            test('all data empty' , (done)=>{

                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : '',
                    image_url : '',
                    price : '',
                    stock : ''
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only')
                        done()
                    }
                })

            })

            test('Price & Stock less than 0' , (done)=>{

                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'http://blackcloth.jpg',
                    price : -10000,
                    stock : -1
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'price / stock cannot less than 0 and numbers only')
                        done()
                    }
                })

            })

            test('image_url not url' , (done)=>{

                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : 'Black T-Shirt',
                    image_url : 'blackcloth.jph',
                    price : 10000,
                    stock : 1
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'img_url must be url')
                        done()
                    }
                })

            })

            test('name empty , not url , price / stock < 0 & string' , (done)=>{

                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : '',
                    image_url : 'blackcloth.jph',
                    price : -50,
                    stock : 'one'
                })
                .set('access_token' , validTokenAdmin)
                .expect(400)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'all content cannot be empty , img_url must be url , price / stock cannot less than 0 and numbers only')
                        done()
                    }
                })

            })

            test('Invalid Access Token' , (done)=>{

                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : 'Black T-Shirt v-5',
                    image_url : 'http://blackcloth.jpg',
                    price : 1000,
                    stock : 3
                })
                .set('access_token' , 'abcdef')
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authenticate')
                        done()
                    }
                })

            })

            test('No Access Token' , (done)=>{

                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : 'Black T-Shirt v-5',
                    image_url : 'http://blackcloth.jpg',
                    price : 1000,
                    stock : 3
                })
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authenticate')
                        done()
                    }
                })

            })

            test('Not Admin' , (done)=>{

                request(app)
                .put(`/products/${idProduct}`)
                .send({
                    name : 'Black T-Shirt V-10',
                    image_url : 'http://blackcloth.jpg',
                    price : 50,
                    stock : 1
                })
                .set('access_token' , validTokenCustomer)
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authorize')
                        done()
                    }
                })
            })

            test('id not found' , (done)=>{

                request(app)
                .put(`/products/1000`)
                .send({
                    name : 'Black T-Shirt V-10',
                    image_url : 'http://blackcloth.jpg',
                    price : 50,
                    stock : 1
                })
                .set('access_token' , validTokenAdmin)
                .expect(404)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Data Not Found')
                        done()
                    }
                })
            })
        })
    })

    describe('Delete Product' , ()=>{
        
        describe('Success Delete Test Case' , () =>{
            
            test('should create success delete response' , (done)=>{
                request(app)
                .delete(`/products/${idProduct}`)
                .set('access_token' , validTokenAdmin)
                .expect(200)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Delete Success')
                        done()
                    }
                })
            })    
        })

        describe('Fail Delete Test Case' , () =>{

            test('Invalid Access Token' , (done)=>{

                request(app)
                .delete(`/products/${idProduct}`)
                .set('access_token' , 'abcdef')
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authenticate')
                        done()
                    }
                })

            })

            test('No Access Token' , (done)=>{

                request(app)
                .delete(`/products/${idProduct}`)
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authenticate')
                        done()
                    }
                })

            })

            test('Not Admin' , (done)=>{

                request(app)
                .delete(`/products/${idProduct}`)
                .set('access_token' , validTokenCustomer)
                .expect(401)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Not Authorize')
                        done()
                    }
                })
            })

            test('id not found' , (done)=>{

                request(app)
                .delete(`/products/1000`)
                .set('access_token' , validTokenAdmin)
                .expect(404)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Data Not Found')
                        done()
                    }
                })
            })
        })
    })

})
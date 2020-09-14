const request = require('supertest')
const app = require('../app.js')


describe('User Router' , () =>{

    describe("POST /login" , () =>{

        describe("Success POST" , () =>{

            test('should give appropriate response' , (done =>{
                request(app)
                .post('/login')
                .send({
                    email : 'admin@email.com',
                    password : '1234'
                })
                .expect(200)
                .end(function(err , res){
                    if(err){
                        done(err)
                    }else{

                        expect(res.body.id).toBe(1)
                        expect(res.body.email).toBe('admin@email.com')
                        expect(res.body).toHaveProperty('access_token')
                        done()

                    }
                })
            }))

        })

        describe("Fail POST" , ()=>{

            test('should give error response when email and password is empty' , (done)=>{
                request(app)
                .post('/login')
                .send({
                    email : '',
                    password : ''
                })
                .expect(404)
                .end(function(err , res){

                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Invalid Email / Password')
                        done()
                    }

                })
            })

            test('should give error response when email is wrong' , (done)=>{
                request(app)
                .post('/login')
                .send({
                    email : 'admin@mail.com',
                    password : '12345'
                })
                .expect(404)
                .end(function(err , res){

                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Invalid Email / Password')
                        done()
                    }

                })
            })

            test('should give error response when password is wrong' , (done)=>{
                request(app)
                .post('/login')
                .send({
                    email : 'admin@email.com',
                    password : '54321'
                })
                .expect(404)
                .end(function(err , res){

                    if(err){
                        done(err)
                    }else{
                        expect(res.body).toHaveProperty('message' , 'Invalid Email / Password')
                        done()
                    }

                })
            })

        })
    })
    
})
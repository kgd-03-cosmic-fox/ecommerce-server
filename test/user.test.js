const request = require('supertest')
const app = require('../app.js')
const jwt = require('jsonwebtoken')
describe("User Routes",() =>{
  describe("POST /login",() =>{
    describe("Success Response",() =>{
      test.only("when login success",(done) =>{
        request(app)
        .post('/login')
        .send({
          email:'admin@mail.com',
          password:'1234'
        })
        .expect(202)
        .end(function(err,res) {
          if(err){
            done(err)
          }
          else{
            // expect(res.body.access_token).toBe(jwt.sign())
            expect(res.body.message).toBe('Login Success')
            done()
          }
        })
      })
    })
    describe("Fail resp",() =>{
      test.only("Should give response when email is not registered on db", (done) =>{
        request(app)
        .post('/login')
        .send({
          email: 'not-registered@mail.com',
          password:'1234',
        })
        .expect(401)
        .end(function(err,res) {
          if(err){
            done(err)
          }
          else{
            console.log(res.body.message)
            expect(res.body.message).toBe('Email not registered,please register first')
            done()
          }
        })
      })
      test.only("Should give response when password is null", (done) =>{
        request(app)
        .post('/login')
        .send({
          email: 'admin@mail.com',
          password:'',
        })
        .expect(400)
        .end(function(err,res) {
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('password cannot be Empty')
            done()
          }
        })
      })
      test.only("Should give response when all is null", (done) =>{
        request(app)
        .post('/login')
        .send({
          email: '',
          password:'',
        })
        .expect(400)
        .end(function(err,res) {
          if(err){
            done(err)
          }
          else{
            expect(res.body.message).toBe('Email and password cannot be Empty')
            done()
          }
        })
      })
    })
  })
})



// {"header":
// {"connection": "close", "content-length": "56", "content-type": "application/json; charset=utf-8", "date": "Mon, 14 Sep 2020 10:43:07 GMT", "etag": "W/\"38-ynKjKZWdidEyPEITyiEX+/jvYo0\"", "x-powered-by": "Express"
// }, "req": {"data": {"email": "not-registered@mail.com",
//                     "password": "1234"
//                   },
//           "headers": {"content-type": "application/json",
//                       "user-agent": "node-superagent/3.8.3"
//                     },
//           "method": "POST",
//           "url": "http://127.0.0.1:57611/login"
//         },
//   "status": 401,
//   "text": "{\"message\":\"Email not registered,please register first\"}"
// }

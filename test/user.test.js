const request = require(`supertest`)
const app = require(`../app.js`)
// const {User} = require(`../models/index`)

// const userData={
//     name: "Rafael",
//     email: "rafael@gmail.com",
//     password: "Secret"
// }

// describe('Register (SUCCESS)', ()=>{
//     afterAll((done)=>{
//         return User.destroy({
//             where:{},
//             truncate:true
//         })
//         .then(data=>{
//             done()
//         })
//         .catch(err=>{
//             done(err)
//         })
//     })
//     test("Should send object with keys: message, id, email", (done)=>{
//         request(app)
//         .post(`/register`)
//         .send(userData)
//         .end((err,res)=>{
//             if(err){throw err}
//             expect(res.status).toBe(201)
//             expect(res.body).toHaveProperty("message",`Hi ${userData.name}, your account is successfully registered`)
//             expect(res.body).toHaveProperty("id",expect.any(Number))
//             expect(res.body).toHaveProperty("email",userData.email)
//             expect(res.body).not.toHaveProperty("password")
//             done()
//         })
//     })
// })

const userLogin = {
    email:"raf@gmail.com",
    password:"1234"
}

describe("TEST LOGIN /login",()=>{
    describe("LOGIN (SUCCESS Case)",()=>{
        test("Should send object with keys message and token",(done)=>{
            request(app)
            .post(`/login`)
            .send(userLogin)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty("message","Login Success")
                expect(res.body).toHaveProperty("token")
                done()
            })
        })
    })
    describe("LOGIN (ERROR Case)",()=>{
        let wrongUserPassword = {...userLogin,password:"this is wrong password"}
        test("Failed because of wrong password",(done)=>{
            request(app)
            .post('/login')
            .send(wrongUserPassword)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message","Invalid email/password")
                done()
            })
        })
        let unregisteredEmail = {...userLogin,email:"unergisteredEmail@gmail.com"}
        test("Failed because of unregistered email account",(done)=>{
            request(app)
            .post(`/login`)
            .send(unregisteredEmail)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message","Invalid email/password")
                done()
            })
        })
        let emailIsNull = {...userLogin,email:null}
        test("Failed because email is null",(done)=>{
            request(app)
            .post(`/login`)
            .send(emailIsNull)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message","email can't be null")
                done()
            })
        })
        let passwordIsNull = {...userLogin, password:null}
        test("Failed because password is null",(done)=>{
            request(app)
            .post("/login")
            .send(passwordIsNull)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("message","password can't be null")
                done()
            })
        })
    })
})

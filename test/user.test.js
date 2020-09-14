const request = require(`supertest`)
const app = require(`../app.js`)


describe('Register (SUCCESS)', ()=>{
    test("Should send object with keys: message, id, email", (done)=>{
        request(app)
        .post(`/register`)
        .send({
            email: "rafael@gmail.com",
            password: "Secret"
        })
        .end((err,res)=>{
            if(err){throw err}
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty("message",`Hi ${userData.name}, your account is successfully registered`)
            expect(res.body).toHaveProperty("id",expect.any(Number))
            expect(res.body).toHaveProperty("email",userData.email)
            expect(res.body).not.toHaveProperty("password")
            done()
        })
    })
})
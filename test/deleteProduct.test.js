const request = require(`supertest`)
const app = require("../app")
const jwt = require(`jsonwebtoken`)
require('dotenv').config()

const {Product} = require(`../models`)


//Object for updating product
let productUpdate = {
    name: "(Update) Shampo Clean 250ml",
    price: 20000,
    stock: 25
}

let productId;

//Product's object if name || price || stock isNull
let productNameIsInteger = {
    name:45124, // tes error karena number
    price:15000,
    stock: 50
}

let productPriceIsString = {
    name:"Shampo Clean 250ml",
    price:"15000", // tes error karena string
    stock: 50
}
let productStockIsString = {
    name:"Shampo Clean 250ml",
    price:15000,
    stock: "50" // test error karena string
}


//Object for logging-, isAdmin = true
let userLogin = {
    name:"Rafael",
    email:"raf@gmail.com",
    isAdmin:true,
    password:"1234"
}


//Object if isAdmin = false
let isNotAdmin = {...userLogin,isAdmin:false}

//Declaration for global scope
let dummyAccessToken;
let dummyIsNotAdmin;

describe("Delete Product /Product/:id",()=>{ 
    afterAll((done)=>{
            return Product.destroy({
                where:{},
                truncate:true
            })
            .then(_=>{
                done()
            })
            .catch(err=>{
                done(err)
            })
    })
    beforeEach((done)=>{
         dummyAccessToken = jwt.sign({
             name:userLogin.name,
             email:userLogin.email,
             isAdmin:userLogin.isAdmin
            },process.env.JWT_SECRET_KEY)

         dummyIsNotAdmin = jwt.sign({
             name:isNotAdmin.name,
             email:isNotAdmin.email,
             isAdmin:isNotAdmin.isAdmin
            },process.env.JWT_SECRET_KEY)

            Product.create({
                name:"Shampo Clean 250ml",
                price: 15000,
                stock: 50
            })
            .then(data=>{
                productId = data.id
                done()
            })
            .catch(err=>{
                done(err)
            })
    })
    describe("DELETE Product(SUCCESS)",()=>{
        test("Must returning success message",(done)=>{
            request(app)
            .delete(`/product/${productId}`)
            .set("access_token", dummyAccessToken)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty("message","Success deleting product")
                done()
            })
        })
    })
    describe("DELETE Product(ERROR)",()=>{
        test("Must returning error message",(done)=>{
            request(app)
            .delete(`/product/${productId}`)
            .set("access_token", dummyAccessToken)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty("message","Success deleting product")
                done()
            })
        })
        test("Error because access_token is undefined",(done)=>{
            request(app)
            .delete(`/product/${productId}`)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty("err","Failed to authenticate")
                done()
            })
        })
        test("Error because access_token is not verified",(done)=>{
            request(app)
            .delete(`/product/${productId}`)
            .set("access_token", dummyIsNotAdmin)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty("err","Unauthorized")
                done()
            })
        })
    })
})
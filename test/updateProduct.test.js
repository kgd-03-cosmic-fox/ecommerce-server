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

describe("PUT Product /Product/:id",()=>{ 
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
    beforeAll((done)=>{
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
    describe("PUT Product(SUCCESS)",()=>{
        test("Returning id, name and stock actual",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .send(productUpdate)
            .set("access_token", dummyAccessToken)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty("message","Success updating product")
                done()
            })
        })
    })
    describe("PUT Product(ERROR)",()=>{
        test("Error because access_token is undefined",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .send(productUpdate)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty("err","Failed to authenticate")
                done()
            })
        })
        test("Error because access_token is not verified",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .set("access_token", dummyIsNotAdmin)
            .send(productUpdate)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty("err","Unauthorized")
                done()
            })
        })
        test("Error because of wrong data types (NAME)",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .set("access_token",dummyAccessToken)
            .send(productNameIsInteger)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Wrong data types input, type of Product Name must be string")
                done()
            })
        })
        test("Error because of wrong data types (STOCK)",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .set("access_token",dummyAccessToken)
            .send(productStockIsString)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Wrong data types input, type of Stock must be number")
                done()
            })
        })
        test("Error because of wrong data types (Price)",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .set("access_token",dummyAccessToken)
            .send(productPriceIsString)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Wrong data types input, type of Price must be number")
                done()
            })
        })
        let priceIsMinus = {...productUpdate,price:-15000}

        test("Error because of PRICE input is minus",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .set("access_token",dummyAccessToken)
            .send(priceIsMinus)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Price can't be under 0")
                done()
            })
        })
        let stockIsMinus = {...productUpdate,stock:-50}
        
        test("Error because of Stock input is minus",(done)=>{
            request(app)
            .put(`/product/${productId}`)
            .set("access_token",dummyAccessToken)
            .send(stockIsMinus)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Stock can't be under 0")
                done()
            })
        })
    })
})
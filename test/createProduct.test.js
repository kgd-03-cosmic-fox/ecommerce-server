const request = require(`supertest`)
const app = require("../app")
const jwt = require(`jsonwebtoken`)
require('dotenv').config()

const {Product} = require(`../models`)


//Object for inputing product
let productInput = {
    name:"Shampo Clean 250ml",
    price: 15000,
    stock: 50,
    category: 'manual brewers',
    imgUrl: "https://s-ecom.ottenstatic.com/original/5d0c942d8db21860973491.jpg"
}

//Product's object if name || price || stock isNull
let productNameIsEmpty = {
    // name:"Shampo Clean 250ml",
    price:15000,
    stock: 50,
    category: 'manual brewers',
    imgUrl: "https://s-ecom.ottenstatic.com/original/5d0c942d8db21860973491.jpg"
}
let productPriceIsEmpty = {
    name:"Shampo Clean 250ml",
    // price:15000,
    stock: 50,
    category: 'manual brewers',
    imgUrl: "https://s-ecom.ottenstatic.com/original/5d0c942d8db21860973491.jpg"
}
let productStockIsEmpty = {
    name:"Shampo Clean 250ml",
    price:15000,
    // stock: 50,
    category: 'manual brewers',
    imgUrl: "https://s-ecom.ottenstatic.com/original/5d0c942d8db21860973491.jpg"
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

describe("POST Product /Product",()=>{ 
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
            done()
    })
    describe("POST Product(SUCCESS)",()=>{
        test("Returning id, name and stok actual",(done)=>{
            request(app)
            .post("/product")
            .send(productInput)
            .set("access_token", dummyAccessToken)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty("message","Success creating new product")
                expect(res.body).toHaveProperty("id",expect.any(Number))
                expect(res.body).toHaveProperty("name",productInput.name)
                expect(res.body).toHaveProperty("price",productInput.price)
                expect(res.body).toHaveProperty("stock",productInput.stock)
                done()
            })
        })
    })
    describe("POST Product(ERROR)",()=>{
        test("Error because access_token is undefined",(done)=>{
            request(app)
            .post("/product")
            .send(productInput)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty("err","Failed to authenticate")
                done()
            })
        })
        test("Error because access_token is not Admin",(done)=>{
            request(app)
            .post(`/product`)
            .set("access_token", dummyIsNotAdmin)
            .send(productInput)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty("err","Unauthorized")
                done()
            })
        })
        test("Error because of empty required field (NAME)",(done)=>{
            request(app)
            .post("/product")
            .set("access_token",dummyAccessToken)
            .send(productNameIsEmpty)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Product's name is required")
                done()
            })
        })
        test("Error because of empty required field (STOCK)",(done)=>{
            request(app)
            .post("/product")
            .set("access_token",dummyAccessToken)
            .send(productStockIsEmpty)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Stock amount is required")
                done()
            })
        })
        test("Error because of empty required field (Price)",(done)=>{
            request(app)
            .post("/product")
            .set("access_token",dummyAccessToken)
            .send(productPriceIsEmpty)
            .end((err,res)=>{
                if(err){throw err}
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty("errors")
                expect(res.body.errors[0]).toBe("Product's price is required")
                done()
            })
        })
        test("Error because of PRICE input is minus",(done)=>{
        let priceIsMinus = {...productInput,price:-15000}
            request(app)
            .post("/product")
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
        test("Error because of Stock input is minus",(done)=>{
        let stockIsMinus = {...productInput,stock:-50}
            request(app)
            .post("/product")
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
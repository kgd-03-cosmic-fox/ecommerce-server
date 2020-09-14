const request = require(`supertest`)
const app = require("../app")

const {Product} = require(`../models`)

function cleanUpDatabase(db){
     db.cleanUp()
}

const productInput = {
    name:"Shampo Clean 250ml",
    price:15000,
    stock: 50
}

describe("POST Product /Product",()=>{ 
    // afterAll(()=>{
    //     cleanUpDatabase(Product)
    // })
    describe("POST Product(SUCCESS)",()=>{
        test("Returning id, name and stok actua",(done)=>{
            request(app)
            .post("/product")
            .send(productInput)
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
    // describe("POST Product(ERROR)",()=>{
    //     test("Error because access_token is not included",(done)=>{
    //         request(app)
    //         .post("/product")
    //         .send("")
    //     })
    // })
})
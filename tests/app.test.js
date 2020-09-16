const request = require('supertest');
const app = require('../app.js');
const { Product, User } = require('../models/index.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET_KEY = 'abababababa';


let adminToken;
let nonAdminToken;
let productId;
let deleteProductId;
//below is variable for testing string longer than 255 (to test input longer than Varchar255 limit)
let veryLongString = 'abcdef';
//end of very long string initialization, actual string will be expanded to 256 length on beforeAll

//below is the variable input from the test result which should appear

let starterData = [
  {
    name: "string",
    image_url: "string",
    price: 2000,
    stock: 8
  },
  {
    name: "strang strong",
    image_url: "strang streng",
    price: 5000,
    stock: 2
  },
  {
    name: "iniYangDiEdit",
    image_url: "editURL",
    price: 100,
    stock: 3
  },
  {
    name: "tobeDeleted",
    image_url: "abaasdass",
    price: 2000,
    stock: 4
  }
];

describe('===TEST CASES===', () => {

  beforeAll((done) => {
    for (let i = 0; i < 25; i++) {
      veryLongString += "1234567890";
    }

    User.bulkCreate([{
      email: "budi@mail.com",
      password: "asdasd",
      role: 0
    },
    {
      email: "admin@mail.com",
      password: "1234",
      role: 1
    }], {})
      .then((data) => {
        return User.findOne({ where: { email: "budi@mail.com" } })
      })
      .then((data) => {
        nonAdminToken = jwt.sign({ id: data.id, email: data.email, role: data.role }, JWT_SECRET_KEY)
        return User.findOne({ where: { email: "admin@mail.com" } })
      })
      .then((data) => {
        adminToken = jwt.sign({ id: data.id, email: data.email, role: data.role }, JWT_SECRET_KEY)
        return Product.bulkCreate(starterData, {});
      })
      .then((data) => {
        return Product.findOne({ where: { name: "iniYangDiEdit" } })
      })
      .then((data) => {
        productId = data.id;
        return Product.findOne({ where: { name: "tobeDeleted" } })
      })
      .then((data) => {
        deleteProductId = data.id;
        done();
      })
      .catch((err) => {
        done(err);
      })
  })


  afterAll((done) => {
    Product.destroy({ where: {}, truncate: true })
      .then((result) => {
        return User.destroy({ where: {}, truncate: true });
      })
      .then((result) => {
        done()
      })
      .catch((err) => {
        done(err);
      })
  })

  describe('login /POST route', () => {
    describe('success login tests', () => {
      test('admin login', (done) => {
        request(app)
          .post('/login')
          .send({
            email: "admin@mail.com",
            password: "1234"
          })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).toBe(200);
              expect(res.body).toHaveProperty("access_token");
              done();
            }
          })
      })

      test('non-admin login', (done) => {
        request(app)
          .post('/login')
          .send({
            email: "budi@mail.com",
            password: "asdasd"
          })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).toBe(200);
              expect(res.body).toHaveProperty("access_token");
              done();
            }
          })
      })
    })

    describe("fail login test", () => {
      test('email must be correct.', (done) => {
        request(app)
          .post('/login')
          .send({
            email: "",
            password: "1234"
          })
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', 'Wrong ID/Password.')
              done();
            }
          })
      })

      test('password must be correct', (done) => {
        request(app)
          .post('/login')
          .send({
            email: "budi@mail.com",
            password: ""
          })
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).toBe(400);
              expect(res.body).toHaveProperty('message', 'Wrong ID/Password.')
              done();
            }
          })
      })
    })
  })

  describe('Product routes', () => {
    describe('POST /products', () => {
      describe('success POST', () => {
        test('Should give appropriate response', (done) => {
          request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send({
              name: "string",
              image_url: "string",
              price: 2000,
              stock: 8
            })
            .end(function (err, res) {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(201);
                expect(res.body.name).toBe('string');
                expect(res.body.image_url).toBe('string');
                expect(res.body.price).toBe("2000");
                expect(res.body.stock).toBe(8);
                done();
              }
            })
        })
        test('String of number are parsed into number instead of returning error.', (done) => {
          request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send({
              name: "strang strong",
              image_url: "strang streng",
              price: "5000",
              stock: "2"
            })
            .end(function (err, res) {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(201);
                expect(res.body.name).toBe('strang strong');
                expect(res.body.image_url).toBe('strang streng');
                expect(res.body.price).toBe("5000");
                expect(res.body.stock).toBe(2);
                done();
              }
            })
        })

      })

      describe('fail POST', () => {
        test('Must have an access token.', (done) => {
          request(app)
            .post('/products')
            .send({
              name: "string",
              image_url: "string",
              price: 2000,
              stock: 8
            })
            .end(function (err, res) {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(401);
                expect(res.body).toHaveProperty('message', 'Unauthorized.');
                done();
              }
            })
        })

        describe('fail POST', () => {
          test('Must have a VALID admin access token.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', nonAdminToken)
              .send({
                name: "string",
                image_url: "string",
                price: 2000,
                stock: 8
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(401);
                  expect(res.body).toHaveProperty('message', 'Unauthorized.');
                  done();
                }
              })
          })

          test('Price must be a number.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: "a",
                stock: 8
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Price must be a number.');
                  done();
                }
              })
          })

          test('Stock must be a number.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: 2000,
                stock: 'a'
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Stock must be a number.');
                  done();
                }
              })
          })

          test('Price must be a positive number', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: -1,
                stock: 8
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Price must be a positive number.');
                  done();
                }
              })
          })
          test('Price must be a positive number. (String input test)', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: "-1",
                stock: 8
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Price must be a positive number.');
                  done();
                }
              })
          })

          test('Stock must be a positive number.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: 2000,
                stock: -1
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Stock must be a positive number.');
                  done();
                }
              })
          })

          test('Stock must be a positive number. (String input test)', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: 2000,
                stock: "-1"
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Stock must be a positive number.');
                  done();
                }
              })
          })

          test('Name must be at least 3 characters long.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "st",
                image_url: "string",
                price: 2000,
                stock: 8
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Product Name length must be between 3 to 255 characters long.');
                  done();
                }
              })
          })

          test('Product name cannot be longer than 255 characters.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: veryLongString,
                image_url: "string",
                price: 2000,
                stock: 8
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Product Name length must be between 3 to 255 characters long.');
                  done();
                }
              })
          })

          test('Image URL cannot be longer than 255 characters.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: veryLongString,
                price: 2000,
                stock: 8
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Image URL cannot be longer than 255 characters.');
                  done();
                }
              })
          })

          test('Stock cannot be decimal.', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: 2000,
                stock: 1.1
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Stock cannot be decimal.');
                  done();
                }
              })
          })

          test('Stock cannot be decimal. (String input test)', (done) => {
            request(app)
              .post('/products')
              .set('access_token', adminToken)
              .send({
                name: "string",
                image_url: "string",
                price: 2000,
                stock: "1.1"
              })
              .end(function (err, res) {
                if (err) {
                  done(err);
                } else {
                  expect(res.status).toBe(400);
                  expect(res.body).toHaveProperty('message', 'Stock cannot be decimal.');
                  done();
                }
              })
          })

        })
      })
    })

    describe('GET /products', () => {
      test('Expected output from database.', (done) => {
        request(app)
          .get('/products')
          .set('access_token', adminToken)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).toBe(200);
              done();
            }
          })
      })
    })

    describe('PUT /products', () => {
      describe('Correct outputs', () => {
        test('Update multiple columns correctly.', (done) => {
          request(app)
            .put(`/products/${productId}`)
            .set('access_token', adminToken)
            .send({
              name: "string",
              image_url: "string",
              price: 2000,
              stock: 8
            })
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(200);
                done();
              }
            })
        })
      })

      describe('Error Inputs', () => {
        test('Handles bad name input in update.', (done) => {
          request(app)
            .put(`/products/${productId}`)
            .set('access_token', adminToken)
            .send({
              name: "a",
              image_url: "string",
              price: 2000,
              stock: 8
            })
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(400);
                expect(res.body).toHaveProperty('message', 'Product Name length must be between 3 to 255 characters long.')
                done();
              }
            })
        })

        test('Handles bad price input in update.', (done) => {
          request(app)
            .put(`/products/${productId}`)
            .set('access_token', adminToken)
            .send({
              name: "string",
              image_url: "string",
              price: -1,
              stock: 8
            })
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(400);
                expect(res.body).toHaveProperty('message', 'Price must be a positive number.')
                done();
              }
            })
        })

        test('Handles bad stock input in update.', (done) => {
          request(app)
            .put(`/products/${productId}`)
            .set('access_token', adminToken)
            .send({
              name: "string",
              image_url: "string",
              price: 2000,
              stock: -1
            })
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(400);
                expect(res.body).toHaveProperty('message', 'Stock must be a positive number.')
                done();
              }
            })
        })

        test('Handles bad price input in update. (String input)', (done) => {
          request(app)
            .put(`/products/${productId}`)
            .set('access_token', adminToken)
            .send({
              name: "string",
              image_url: "string",
              price: "-1",
              stock: 8
            })
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(400);
                expect(res.body).toHaveProperty('message', 'Price must be a positive number.')
                done();
              }
            })
        })

        test('Handles bad stock input in update. (String input)', (done) => {
          request(app)
            .put(`/products/${productId}`)
            .set('access_token', adminToken)
            .send({
              name: "string",
              image_url: "string",
              price: 2000,
              stock: "-1"
            })
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                expect(res.status).toBe(400);
                expect(res.body).toHaveProperty('message', 'Stock must be a positive number.')
                done();
              }
            })
        })

      })

    })
    describe('DELETE /products', () => {
      test('Correct status response on successful deletion', (done) => {
        request(app)
          .delete(`/products/${deleteProductId}`)
          .set('access_token', adminToken)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).toBe(200);
              done();
            }
          })
      })
    })
  })
})

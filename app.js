require('dotenv').config();
const express = require('express');
const errorChecker = require('./middlewares/error-check.js');
const app = express();
const routes = require('./routes/index-router.js');
// app.listen is in ./http/server.js

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorChecker);

module.exports = app;

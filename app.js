const express = require('express');
const app = express();
// app.listen is in ./http/server.js

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

module.exports = app;

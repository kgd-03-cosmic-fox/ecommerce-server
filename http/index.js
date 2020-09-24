const app = require('../app.js')
const port = 3007 || process.env.PORT
const http = require('http');
const server = http.createServer(app);

server.listen(port, function() {
  console.log('Express running on port', port);
});

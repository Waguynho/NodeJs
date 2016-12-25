const http = require('http');

var hello = require('./modulos_ws/hello.js');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 204;
  res.setHeader('Content-Type', 'application/json');
  res.end("\"{nome:\"Wagner\",idade:27}"); 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(hello.ola());
});
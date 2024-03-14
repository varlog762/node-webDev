const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');
  console.log(req.url, req.method);

  // res.setHeader('Content-Type', 'text/html');

  // res.write('<head><link rel="stylesheet" href="#"></link>');

  // res.write('<h1>Hello world!</h1>');
  // res.write('<p>My name is Ryhor</p>');

  res.setHeader('Content-Type', 'application/json');

  const data = JSON.stringify([
    { name: 'Ryhor', age: 37 },
    { name: 'Gregory', age: 25 },
  ]);

  res.end(data);
});

server.listen(PORT, 'localhost', err => {
  err ? console.log(err) : console.log(`Server was started on port ${PORT}`);
});

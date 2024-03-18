const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const createPath = page => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server was started on port ${PORT}`);
});

app.get('/', (req, res) => {
  /** We don't need to set content-type header - express automatically detects the sending data-type & sets the header! **/
  // res.send('<h1>Hello world!</h1>');

  res.sendFile(createPath('index'));
});

app.get('/about-us', (req, res) => {
  res.redirect('/');
});

app.get('/contacts', (req, res) => {
  res.sendFile(createPath('contacts'));
});

app.use((req, res) => {
  res.status(404).sendFile(createPath('error'));
});

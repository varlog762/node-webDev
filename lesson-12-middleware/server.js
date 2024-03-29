const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = page => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server was started on port ${PORT}`);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use(express.static('./styles'));

app.get('/', (req, res) => {
  const title = 'Home';

  res.render(createPath('index'), { title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/');
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'YouTube', link: 'http://youtube.com' },
    { name: 'Twitter', link: 'http://twitter.com' },
    { name: 'GitHub', link: 'http://github.com' },
  ];

  res.render(createPath('contacts'), { contacts, title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';

  res.render(createPath('post'), { title });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';

  res.render(createPath('posts'), { title });
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';

  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = '404';

  res.status(404).render(createPath('error'), { title });
});

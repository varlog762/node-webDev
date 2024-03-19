const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Post = require('./models/post');
const { error } = require('console');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const DB =
  'mongodb+srv://boot762:Brooklyn7.62@cluster0.sbbch2l.mongodb.net/node-blog?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB)
  .then(res => console.log('Connected to DB'))
  .catch(err => console.log(err));

const createPath = page => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server was started on port ${PORT}`);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use(express.urlencoded({ extended: false }));

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
  const post = {
    id: '1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    title: 'Post title',
    date: '05.05.2021',
    author: 'Ryhor',
  };
  res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = [
    {
      id: '1',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
      title: 'Post title',
      date: '05.05.2021',
      author: 'Ryhor',
    },
  ];
  res.render(createPath('posts'), { title, posts });
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });

  post
    .save()
    .then(result => res.send(result))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: error });
    });
  // res.render(createPath('post'), { post, title });
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';

  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = '404';

  res.status(404).render(createPath('error'), { title });
});

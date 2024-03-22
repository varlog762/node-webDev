const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverriide = require('method-override');

const Post = require('./models/post');
const Contact = require('./models/contacts');

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

app.use(methodOverriide('_method'));

app.get('/', (req, res) => {
  const title = 'Home';

  res.render(createPath('index'), { title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/');
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  Contact.find()
    .then(contacts => res.render(createPath('contacts'), { contacts, title }))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.delete('/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then(post => res.render(createPath('post'), { title, post }))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.get('/edit/:id', (req, res) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { title, post }))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.put('/edit/:id', (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, { title, text, author })
    .then(result => res.redirect(`/posts/${id}`))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then(posts => res.render(createPath('posts'), { title, posts }))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });

  post
    .save()
    .then(result => res.redirect('/posts'))
    .catch(err => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';

  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = '404';

  res.status(404).render(createPath('error'), { title });
});

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverriide = require('method-override');

const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const DB =
  'mongodb+srv://boot762:Brooklyn7.62@cluster0.sbbch2l.mongodb.net/node-blog?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB)
  .then(res => console.log('Connected to DB'))
  .catch(err => console.log(err));

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

app.use(postRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  const title = '404';

  res.status(404).render(createPath('error'), { title });
});

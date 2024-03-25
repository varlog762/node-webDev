const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const mongoose = require('mongoose');
const methodOverriide = require('method-override');
require('dotenv').config();

const apiPostRoutes = require('./routes/api-post-routs');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgRedBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT;
const DB = mongoose
  .connect(process.env.MONGO_URL)
  .then(res => console.log(successMsg('Connected to DB')))
  .catch(err => console.log(errorMsg(err)));

app.listen(PORT, err => {
  err
    ? console.log(errorMsg(err))
    : console.log(successMsg(`Server was started on port ${PORT}`));
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

app.use(apiPostRoutes);
app.use(postRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  const title = '404';

  res.status(404).render(createPath('error'), { title });
});

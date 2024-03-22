const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const handleError = (res, err) => {
  console.log(err);
  res.render(createPath('error'), { title: 'error' });
};

const getPost = (req, res) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then(post => res.render(createPath('post'), { title, post }))
    .catch(err => handleError(res, err));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => handleError(res, err));
};

const getAllPosts = (req, res) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then(posts => res.render(createPath('posts'), { title, posts }))
    .catch(err => handleError(res, err));
};

const getAddPost = (req, res) => {
  const title = 'New Post';

  res.render(createPath('add-post'), { title });
};

const saveNewPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });

  post
    .save()
    .then(result => res.redirect('/posts'))
    .catch(err => handleError(res, err));
};

const getEditPost = (req, res) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { title, post }))
    .catch(err => handleError(res, err));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, { title, text, author })
    .then(result => res.redirect(`/posts/${id}`))
    .catch(err => handleError(res, err));
};

module.exports = {
  getPost,
  deletePost,
  getAllPosts,
  saveNewPost,
  getEditPost,
  editPost,
  getAddPost,
};

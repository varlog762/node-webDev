const express = require('express');

const {
  getPost,
  deletePost,
  getAllPosts,
  saveNewPost,
  getEditPost,
  editPost,
  getAddPost,
} = require('../controllers/post-controller');

const router = express.Router();

router.delete('/posts/:id', deletePost);
router.get('/posts/:id', getPost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/posts', getAllPosts);
router.post('/add-post', saveNewPost);
router.get('/add-post', getAddPost);

module.exports = router;

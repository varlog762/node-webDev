const express = require('express');

const {
  getPost,
  deletePost,
  getAllPosts,
  saveNewPost,
  editPost,
} = require('../controllers/api-post-controller');

const router = express.Router();

// Get all posts
router.get('/api/posts', getAllPosts);
// Add new post
router.post('/api/add-post', saveNewPost);
// Get post by ID
router.get('/api/post/:id', getPost);
// Delete post by ID
router.delete('/api/post/:id', deletePost);
// Update post by ID
router.put('/api/edit/:id', editPost);

module.exports = router;

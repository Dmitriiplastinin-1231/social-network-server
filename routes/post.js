var express = require('express');
var router = express.Router();
var { getAllPosts, getUserPosts, createPost, editPost, deletePost } = require('../controllers/post');
var { auth } = require('../middleware/auth');

// /post
router.get('/', getAllPosts)
// /post/:id
router.get('/:id', getUserPosts)
// /post/create
router.post('/create', auth, createPost);
// /post/edit
router.put('/edit', auth, editPost);
// /post/delete
router.delete('/delete', auth, deletePost);

module.exports = router;
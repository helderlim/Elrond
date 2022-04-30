const { validationResult } = require('express-validator/check')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({message: 'Fetched posts successfully.', posts: posts})
    })
    .catch(err => {
    if (!err.statusCode){
      err.statusCode = 500
    }
    next(err);
  })
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation  failed, entered data is incorrect.');
    error.statusCode = 422
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'https://images.unsplash.com/photo-1651243960650-e01bb3102ec9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    creator: { name: 'helder lima' },
  });
  post.save()
    .then( result => {
      res.status(201).json({
        message: 'Post created sucessfully',
        post: result
      })
    })
    .catch( err => {
      if (!err.statusCode){
        err.statusCode = 500
      }
      next(err);
    });
}

exports.getPost = (req, res, next) =>{
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error('Cloud not find post')
        error.statusCode = 404;
        throw error
      }
      res.status(200).json({ message: 'Post fetched', post: post });
    })
    .catch(err => {
      if (!err.statusCode){
        err.statusCode = 500
      }
      next(err);
    });
}
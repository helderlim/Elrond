const { validationResult } = require('express-validator/check')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: 1,
        title: 'Primerio post',
        content: 'esta é minha primeira requisição',
        imageUrl: 'https://images.unsplash.com/photo-1648737119247-e93f56878edf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
        creator: {
          name: 'Helder'
        },
        createdAt: new Date()
      }
    ]
  })
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({
        message: 'Validation  failed, entered data is incorrect.',
        errors: errors.array()
      })
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
    .catch( err => console.log(err));
}
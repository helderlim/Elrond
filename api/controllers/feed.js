exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id:1,
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
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: 'Post created sucessfully',
    post: { id: new Date().toISOString(), title: title, content: content}
  })
}
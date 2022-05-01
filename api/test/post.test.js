const axios = require('axios');
const crypto = require('crypto');

var postId = ''

const generate = () => {
  return crypto.randomBytes(20).toString('hex');
}

const request = (url, method, data) => {
  return axios({url, method, data})
}

test ('Should get posts', async () => {
  const response = await request('http://localhost:8080/feed/posts', 'get');
  const posts = response.data.posts;
  expect(posts.length).toBe(3)
});

test ('shold save Post ', async () => {
  const data = {
    title: generate(),
    content: generate(),
    imageUrl: ''
  };

  const response = await request('http://localhost:8080/feed/post', 'post', data);
	const post = response.data.post;
  postId = post._id
	expect(post.title).toBe(data.title);
	expect(post.content).toBe(data.content);
})

test ( 'Should deleted Post', async () => {
  const deletePost = await request(`http://localhost:8080/feed/post/${postId}`, 'delete')
  expect(deletePost.data.message).toBe('Deleted post. ')
})

test ('Shold update Posts ', async () => {
  const data = {
    title: generate(),
    content: generate(),
    imageUrl: ''
  };
  const response = await request('http://localhost:8080/feed/post/626eb1b77f3c85b743293444', 'put', data);
	const post = response.data.post;

  expect(post.title).toBe(data.title);
	expect(post.content).toBe(data.content);
})

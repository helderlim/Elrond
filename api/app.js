const express = require('express')
const bodyParsed = require('body-parser')
const feedRoutes = require('./routes/feed')

const app = express();

// app.use(bodyParsed.urlencoded())
app.use(bodyParsed.json());

//midleware - header da requisição
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
});

app.use('/feed', feedRoutes)

app.listen(8080);

const express = require('express')
const bodyParsed = require('body-parser')
const feedRoutes = require('./routes/feed')
const mongoose = require('mongoose')

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

mongoose.connect('mongodb+srv://Elrond:xv0beXobWUrVmh30@cluster0.qatt4.mongodb.net/messages?retryWrites=true&w=majority')
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log('connection err database ', err))

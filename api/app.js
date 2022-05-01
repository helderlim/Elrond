const path = require('path')

const express = require('express')
const bodyParsed = require('body-parser')
const feedRoutes = require('./routes/feed')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb( null, true);
  } else {
    cb(null, false);
  }
}
app.use(bodyParsed.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')));

//midleware - header da requisição
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
});

app.use('/feed', feedRoutes)

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message})
})

mongoose.connect('mongodb+srv://Elrond:xv0beXobWUrVmh30@cluster0.qatt4.mongodb.net/messages?retryWrites=true&w=majority')
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log('connection err database ', err))

const express = require('express');

const app = express();

app.listen('3000')

app.route('/').get((req, res)=>res.send("hello world"))

app.use(express.json())

app.route('/post').post( (req, res)=> res.sendStatus(200))

let name = "helder"

app.route('/put').put((req, res) => {
  name = req.body
  res.sendStatus(200)
  console.log('name', name)
})
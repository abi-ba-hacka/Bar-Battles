var express = require('express')
var app = express()

var db = require('./db')

app.get('/', function (req, res) {
  res.json({status: 200})
})

app.post('/:model/create/', function (req, res) {
  db.create(req, res);
})

app.post('/:model/update/:id', function (req, res) {
  db.update(req, res);
})

app.get('/:model/', function (req, res) {
  db.get(req, res);
})

app.get('/:model/:id', function (req, res) {
  db.get(req, res);
})

app.post('/:model/remove/', function (req, res) {
  db.remove(req, res);
})

app.listen(3000)

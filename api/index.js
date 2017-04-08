var express = require('express')
var cors = require('cors')
var app = express()

var db = require('./db')
var qr = require('./qr')

app.use(cors())

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

// QR
app.post('/redeem/', function (req, res) {
  qr.redeem(req, res);
})

// USER
app.get('/users/facebook/:id', function (req, res) {
  db.getUserByFacebookId(req, res);
})

app.listen(3000)

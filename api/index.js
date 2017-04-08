var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express()

var db = require('./db')
var qr = require('./qr')
var prize = require('./prize')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.json({status: 200})
})

app.post('/:model/create/', function (req, res) {
  db.create(req, res);
})

app.post('/:model/:id', function (req, res) {
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
app.post('/encrypt/', function (req, res) {
  qr.encrypt(req, res);
})

// USER
app.get('/users/facebook/:id', function (req, res) {
  db.getUserByFacebookId(req, res);
})

// BAR
app.get('/bar/users/', function (req, res) {
  db.getBarUsers(req, res);
})

// PRIZE
app.post('/prize/send', function (req, res) {
  prize.send(req, res);
})

app.listen(3000)

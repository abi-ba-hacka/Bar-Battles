var db = require('./db');
var CryptoJS = require("crypto-js");

exports.encrypt = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.data) {
    res.json({error: 'BAD_DATA'});
    return;
  }
  let qrcode;
  try {
    qrcode = CryptoJS.AES.encrypt(JSON.stringify(req.body.data), db.hash);
  } catch (e) {
    console.log('qrcode encrypt error');
    console.log(e);
    res.json({error: 'BAD_QRCODE'});
    return;
  }

  res.json(qrcode);
  return;
}

exports.redeem = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.qrcode || !req.body.userId) {
    res.json({error: 'BAD_DATA'});
    return;
  }
  let user = db.users.find(user => user.id === req.body.userId);
  if (!user) {
    res.json({error: 'BAD_USER'});
    return;
  }
  let qr;
  try {
    var bytes  = CryptoJS.AES.decrypt(req.body.qrcode.toString(), db.hash);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    qr = JSON.parse(plaintext);
  } catch (e) {
    console.log('qrcode decrypt error');
    console.log(e);
    res.json({error: 'BAD_QRCODE'});
    return;
  }
  qr = {
    barId: '1',
    beerId: '1'
  };

  let bar = db.bars.find(bar => bar.id === qr.barId);
  let beer = db.beers.find(beer => beer.id === qr.beerId);
  let battle = db.battles.find(battle => battle.id === qr.battleId);
  // TODO get beer points on bar (take promotions into account)

  let points = 1;
  user = Object.assign({}, user, {
    points: user.points + points,
    beers: user.beers.push(beer.id)
  })
  db.updateItemInModel('users', user);

  bar = Object.assign({}, bar, {
    points: bar.points + 1
  })
  db.updateItemInModel('bars', bar);

  beer = Object.assign({}, beer, {
    points: beer.points + 1
  })
  db.updateItemInModel('beers', beer);

  battle = Object.assign({}, battle, {
    points: battle.points + 1
  })
  db.updateItemInModel('battles', battle);

  // TODO Update battle log

  res.json({
    bar,
    beer,
    user,
    battle
  });
  return;
}

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
    qrcode = CryptoJS.AES.encrypt(JSON.stringify(req.body.data), db.hash).toString();
  } catch (e) {
    console.log('qrcode encrypt error');
    console.log(e);
    res.json({error: 'BAD_QRCODE'});
    return;
  }

  res.json({data: qrcode});
  return;
}

exports.redeem = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.qrcode || !req.body.userId) {
    res.json({error: 'BAD_DATA'});
    return;
  }
  let user = db.data.users.find(user => user.id === req.body.userId);
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

  let bar = db.data.bars.find(bar => bar.id === qr.barId);
  let beer = db.data.beers.find(beer => beer.id === qr.beerId);

  // TODO get current battle if any (bar.activeBattle does not exist)
  let battle = db.data.battles.find(battle => battle.id === bar.activeBattle);
  // TODO get beer points on bar (take promotions into account)

  let points = 1;
  user = db.updateItemInModel('users', Object.assign({}, user, {
    points: user.points + points,
    activeBar: bar.id,
    beers: user.beers.concat([beer.id])
  }));

  bar = db.updateItemInModel('bars', Object.assign({}, bar, {
    points: bar.points + 1
  }));

  beer = db.updateItemInModel('beers', Object.assign({}, beer, {
    points: beer.points + 1
  }));

  if (battle) {
    battle = db.updateItemInModel('battles', Object.assign({}, battle, {
      points: battle.points + 1
    }));

    // TODO Update battle log
  }

  res.json({
    bar,
    beer,
    user,
    battle
  });
  return;
}

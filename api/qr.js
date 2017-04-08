var db = require('./db');

exports.redeem = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  let user = db.users.find(user => user.id === req.body.userId);
  if (!user) {
    res.json({error: 'BAD_USER'});
    return;
  }
  // let qr = req.body.qr;
  let qr = {
    barId: '1',
    beerId: '1'
  };
  let bar = db.bars.find(bar => bar.id === qr.barId);
  let beer = db.beers.find(beer => beer.id === qr.beerId);
  let battle = db.battles.find(battle => battle.id === qr.battleId);
  // TODO get beer points on bar (take promotions into account)

  let points = 1;
  user = Object.assign({}, user, {
    points: user.points + points
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

  res.json({
    bar,
    beer,
    user,
    battle
  });
  return;
}

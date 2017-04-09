var db = require('./db');

exports.addPromotion = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.userId || !req.body.barId || !req.body.promotion) {
    return res.json({error: 'BAD_DATA'});
  }

  let user = db.data.users.find(user => user.id === req.body.userId);
  let bar = db.data.bars.find(bar => bar.id === req.body.barId);

  if (!user || !bar) {
    return res.json({error: 'BAD_DATA'});
  }

  if (user.role != 'admin') {
    return res.json({error: 'NOT_ADMIN'});
  }

  bar = db.updateItemInModel('bars', Object.assign({}, bar, {
    prizes: bar.promotions.concat([promotion])
  }))

  res.json(bar);
  return;
}

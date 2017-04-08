var db = require('./db');

exports.send = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.userId || !req.body.prizeId || !req.body.receiverId) {
    res.json({error: 'BAD_DATA'});
    return;
  }

  let user = db.users.find(user => user.id === req.body.userId);
  let receiver = db.users.find(user => user.id === req.body.receiverId);
  let prize = db.prizes.find(prize => prize.id === req.body.prizeId);

  if (!user || !receiver || !prize) {
    res.json({error: 'BAD_DATA'});
    return;
  }
  // TODO Checkups
  if (user.prizes.indexOf(prize.id) === -1 || prize.redeemed) {
    res.json({error: 'BAD_PRIZE'});
    return;
  }

  user = db.updateItemInModel('users', Object.assign({}, user, {
    prizes: user.prizes.filter(userPrize => userPrize.id !== prize.id)
  }))

  receiver = db.updateItemInModel('users', Object.assign({}, receiver, {
    prizes: receiver.prizes.concat([prize.id])
  }))

  prize = db.updateItemInModel('prizes', Object.assign({}, prize, {
    redeemed: true
  }))

  // TODO Update Battle Log

  res.json({
    user,
    receiver,
    prize
  });
  return;
}

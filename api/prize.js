var db = require('./db');

exports.send = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.userId || !req.body.prizeId || !req.body.receiverId) {
    return res.json({error: 'BAD_DATA'});
  }

  let user = db.data.users.find(user => user.id === req.body.userId);
  let receiver = db.data.users.find(user => user.id === req.body.receiverId);
  let prize = db.data.prizes.find(prize => prize.id === req.body.prizeId);

  if (!user || !receiver || !prize) {
    return res.json({error: 'BAD_DATA'});
  }
  // TODO Checkups
  if (user.prizes.indexOf(prize.id) === -1 || prize.redeemed) {
    return res.json({error: 'BAD_PRIZE'});
  }

  user = db.updateItemInModel('users', Object.assign({}, user, {
    prizes: user.prizes.filter(userPrize => userPrize.id !== prize.id)
  }))

  if (!user.activeBar) {
    return res.json({error: 'NO_ACTIVE_BAR'});
  }
  let activeBar = db.data.bars.find(bar => bar.id === user.activeBar);
  if (!activeBar) {
    return res.json({error: 'NO_ACTIVE_BAR'});
  }

  if (!activeBar.activeBattle) {
    return res.json({error: 'NO_ACTIVE_BATTLE'});
  }
  let activeBattle = db.data.battles.find(battle => battle.id === user.activeBattle);
  if (!activeBattle) {
    return res.json({error: 'NO_ACTIVE_BATTLE'});
  }

  receiver = db.updateItemInModel('users', Object.assign({}, receiver, {
    prizes: receiver.prizes.concat([prize.id])
  }))
  if (!receiver) {
    return res.json({error: 'NO_RECEIVER'});
  }

  prize = db.updateItemInModel('prizes', Object.assign({}, prize, {
    redeemed: true
  }))
  if (!prize) {
    return res.json({error: 'NO_PRIZE'});
  }

  let battle = db.data.battles.find(battle => battle.id === req.body.battleId);
  if (!battle) {
    return res.json({error: 'NO_BATTLE'});
  }

  battle = db.updateItemInModel('battles', Object.assign({}, battle, {
      log: battle.log.concat({
        user: user.id,
        receiver: receiver.id,
        action: 'user_gift',
        bar: activeBar.id
      })
  }))

  res.json({
    user,
    receiver,
    prize,
    battle
  });
  return;
}

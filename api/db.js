exports.hash = 'randomString';
exports.data = {
  // USERS
  users: [{
    id: '1',
    name: 'sebas',
    image: 'https://fb-s-c-a.akamaihd.net/h-ak-xat1/v/t1.0-9/13697031_731916956911195_2107886986825962297_n.jpg?oh=275edc630b186c284fa7cb05cd3baae1&oe=598B7D4A&__gda__=1502557718_96e88d1cbe2e8682cd3859d0e9131887',
    points: 0,
    activeBar: '',
    prizes: ['1'],
    beers: [],
    facebook: {
      id: '123',
      name: '',
      token: ''
    }
  }, {
    id: '2',
    name: 'rama',
    image: 'https://scontent-gru2-2.xx.fbcdn.net/v/t1.0-1/c32.0.160.160/p160x160/15871912_10212275289543867_1051986596874152479_n.jpg?oh=9b6237770facff3cfa768be6a75b4799&oe=595E72F2',
    points: 0,
    activeBar: '',
    prizes: [],
    beers: [],
    facebook: {
      id: '',
      name: '',
      token: ''
    }
  }, {
    id: '3',
    name: 'pancho',
    image: 'https://scontent-gru2-2.xx.fbcdn.net/v/t1.0-1/p160x160/16387870_10211560272067882_6068786500899002109_n.jpg?oh=320dca105695885bbfc7a6ed88b86550&oe=599593A6',
    points: 0,
    activeBar: '',
    prizes: [],
    beers: [],
    facebook: {
      id: '',
      name: '',
      token: ''
    }
  }, {
    id: '4',
    name: 'lucho',
    image: 'https://fb-s-d-a.akamaihd.net/h-ak-xpt1/v/t1.0-9/10500366_10152461445303476_7908026095031656898_n.jpg?oh=676d1f8fe8b86a0af4b388f1035127e5&oe=5988FC7D&__gda__=1502327706_462077912d4aa8665a210141a60dbc84',
    points: 0,
    activeBar: '2',
    prizes: [],
    beers: [],
    facebook: {
      id: '10155132820368476',
      name: '',
      token: ''
    }
  }],

  // BARS
  bars: [{
    id: '1',
    name: 'Refugio Callao y Viamonte',
    type: 'refugio',
    location: 'Callao y Viamonte, Buenos Aires',
    points: 0,
    image: 'http://i.imgur.com/w3QXWgc.png',
    activeBattle: '1',
    battles: ['1'],
    prizes: [],
    users: ['1'],
    promotions: []
  }, {
    id: '2',
    name: 'Circuito Chico Km 24.7',
    type: '',
    location: 'Callao y Viamonte, Buenos Aires',
    points: 4,
    image: 'http://i.imgur.com/oRhjO6O.png',
    activeBattle: '1',
    battles: ['1'],
    prizes: [],
    users: ['4'],
    promotions: []
  }],

  // BEERS
  beers: [{
    id: '1',
    name: 'IPA',
    description: 'new beer'
  }, {
    id: '2',
    name: 'weise',
    description: 'best beer'
  }],

  // BATTLES
  battles: [{
    id: '1',
    bars: ['1','2'],
    start: 1491955200000,
    end: 1492041600000,
    points: 0,
    log: [{ // BattleAction
      user: '1',
      receiver: '2',
      action: 'user_gift', // user_gift, bar_discount, beer_scan
      message: '',
      bar: '1',
      beer: '1'
    }],
  }],

  // PRIZES
  prizes: [{
    id: '1',
    name: 'Beer!',
    redeemed: false
  }]


};

exports.create = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !exports.data[req.params.model]) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  exports.data[req.params.model].push(req.body);
  res.json(req.body);
  return;
}

exports.get = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !exports.data[req.params.model]) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  if (req.params.id) {
    let model = exports.data[req.params.model].find(model => model.id === req.params.id)
    res.json(model);
    return;
  }
  res.json(exports.data[req.params.model]);
  return;
}

exports.update = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !exports.data[req.params.model] || !req.params.id) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  let found = exports.updateItemInModel(
    req.params.model,
    Object.assign({}, req.body, {id: req.params.id})
  )
  found? res.json(found) : res.json({status: 404, error: 'NOT_FOUND'});
  return;
}

exports.remove = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !exports.data[req.params.model] || !req.params.id) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  let found;
  exports.data[req.params.model] = exports.data[req.params.model].filter(model => {
    if (model.id === req.params.id) {
       found = Object.assign({}, model, req.body);
       return false;
    }
    return model;
  })
  found? res.json(found) : res.json({status: 404, error: 'NOT_FOUND'});
  return;
}

exports.updateItemInModel = function(model, item) {
  let found;
  exports.data[model] = exports.data[model].map(model => {
    if (model.id === item.id) {
       found = Object.assign({}, model, item);
       return found;
    }
    return model;
  })
  return found;
}

// USER
exports.getUserByFacebookId = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.id) {
    res.json({error: 'BAD_PARAMS'})
    return;
  }
  let model = exports.data.users.find(model => model.facebook.id === req.params.id)
  if (!model) {
    res.json({error: 'BAD_ID'})
    return;
  }
  res.json(model);
  return;
}

// BAR
exports.getBarUsers = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.body.barId || !req.body.userId) {
    res.json({error: 'BAD_PARAMS'})
    return;
  }
  let user = exports.data.users.find(user => user.id === req.body.userId)
  let bar = exports.data.bars.find(bar => bar.id === req.body.barId)

  if (!user || !bar) {
    res.json({error: 'BAD_DATA'})
    return;
  }

  // TODO Do checkup of current battles
  let users = exports.data.users.filter(user => user.activeBar === bar.id)

  res.json(users);
  return;
}

exports.hash = 'randomString';
exports.data = {
  // USERS
  users: [{
    id: '1',
    name: 'il pioni',
    points: 0,
    prizes: ['1'],
    beers: [],
    facebook: {
      id: '123',
      name: '',
      token: ''
    }
  }, {
    id: '2',
    name: 'il rami',
    points: 0,
    prizes: [],
    beers: [],
    facebook: {
      id: '',
      name: '',
      token: ''
    }
  }, {
    id: '3',
    name: 'il panchi',
    points: 0,
    prizes: [],
    beers: [],
    facebook: {
      id: '',
      name: '',
      token: ''
    }
  }, {
    id: '4',
    name: 'il lucho',
    points: 0,
    prizes: [],
    beers: [],
    facebook: {
      id: '',
      name: '',
      token: ''
    }
  }],

  // BARS
  bars: [{
    id: '1',
    name: 'patagonia bsas',
    points: 0,
    image: '',
    battle: '1',
    prizes: [],
    users: ['1'],
    promotions: []
  }, {
    id: '2',
    name: 'patagonia bariloche',
    points: 4,
    image: '',
    battle: '1',
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
    bars: ['1','2'],
    start: 1491955200000,
    end: 1492041600000,
    points: 0,
    log: [], //BattleAction
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

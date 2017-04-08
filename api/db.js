let db = {
  users: [{
    id: '1',
    name: 'il pioni'
  }, {
    id: '2',
    name: 'il rami'
  }, {
    id: '3',
    name: 'il panchi'
  }, {
    id: '4',
    name: 'il lucho'
  }],
  bars: [{
    id: '1',
    name: 'patagonia bsas'
  }, {
    id: '2',
    name: 'patagonia bariloche'
  }],
  beers: [{
    id: '1',
    name: 'IPA'
  }, {
    id: '2',
    name: 'weise'
  }],


};

exports.create = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !db[req.params.model]) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  db[req.params.model].push(req.body);
  res.json(req.body);
  return;
}

exports.get = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !db[req.params.model]) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  if (req.params.id) {
    let model = db[req.params.model].find(model => model.id === req.params.id)
    res.json(model);
    return;
  }
  res.json(db[req.params.model]);
  return;
}

exports.update = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !db[req.params.model] || !req.params.id) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  let found;
  db[req.params.model] = db[req.params.model].map(model => {
    if (model.id === req.params.id) {
       found = Object.assign({}, model, req.body);
       return found;
    }
    return model;
  })
  found? res.json(found) : res.json({status: 404, error: 'NOT_FOUND'});
  return;
}

exports.remove = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  if (!req.params.model || !db[req.params.model] || !req.params.id) {
    res.json({error: 'BAD_MODEL'})
    return;
  }
  let found;
  db[req.params.model] = db[req.params.model].filter(model => {
    if (model.id === req.params.id) {
       found = Object.assign({}, model, req.body);
       return false;
    }
    return model;
  })
  found? res.json(found) : res.json({status: 404, error: 'NOT_FOUND'});
  return;
}

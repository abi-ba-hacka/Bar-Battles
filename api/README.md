# Model
```
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
```

# endpoints
models: `users, bars, beers`
### errors
`-> {error: '***'}`

### get all
`GET: https://6aed40e1.ngrok.io/{model}`
`-> [{item}]`
### get by id
`GET: https://6aed40e1.ngrok.io/{model}/{id}`
`-> {item}`
### update by id
`POST: https://6aed40e1.ngrok.io/{model}/{id} - BODY: {changes}`
`-> {item}`
### delete by id
`POST: https://6aed40e1.ngrok.io/{model}/{id}`
`-> {item}`

const { authorize } = require('../import/authorize')

authorize()
  .then(console.log)
  .catch(console.error)

// To (re)authorize access to google sheets, delete token.json and run this file with:
// node admin/authorizeGoogleSheets.js

const { authorize } = require('../import/authorize')

authorize()
  .then(console.log)
  .catch(console.error)

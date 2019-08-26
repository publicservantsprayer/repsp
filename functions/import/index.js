const admin = require('firebase-admin')

const { importSpreadsheet, addStateNameAndRegion } = require('./importSpreadsheet')
const { authorize } = require('./authorize')

let serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore();

// We'll turn this into a google function later where admin can trigger
// via the web UI with URL to state and federal spreadsheets
const federalMembers = 'https://docs.google.com/spreadsheets/d/147EH46mhjX_XBXSp6dwVbD72E_u7__7cEB3mZLBnSqo/edit#gid=2125524484'
const stateMembers = 'https://docs.google.com/spreadsheets/d/1UdYPJjKOsUKmazhYyzawjdKzrfzSBknZKgU0UJ1FbGQ/edit#gid=1144399491'

const importLeaders = async () => {
  const auth = await authorize()

  console.log('Importing federal...')
  await importSpreadsheet(db, federalMembers, auth)

  console.log('Importing state...')
  await importSpreadsheet(db, stateMembers, auth)

  console.log('Adding state names and regions')
  await addStateNameAndRegion(db)
}

importLeaders()


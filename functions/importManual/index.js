const admin = require('firebase-admin')

const { importSpreadsheet, addStateNameAndRegion } = require('./importSpreadsheet')
const { authorize } = require('./authorize')

let serviceAccount = require('../../serviceAccountKey-production.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://thepsp-org-staging.firebaseio.com',
  // databaseURL: 'https://repsp123.firebaseio.com',
})

let db = admin.firestore()

// We'll turn this into a google function later where admin can trigger
// via the web UI with URL to state and federal spreadsheets
const federalMembers =
  // 'https://docs.google.com/spreadsheets/d/147EH46mhjX_XBXSp6dwVbD72E_u7__7cEB3mZLBnSqo/edit#gid=2125524484'
  'https://docs.google.com/spreadsheets/d/1IijZnZniRJYr0_h2BjWFjYUYqEg3dqzNj2yxfZ0meVM/edit?usp=sharing'
const stateMembers =
  // 'https://docs.google.com/spreadsheets/d/1UdYPJjKOsUKmazhYyzawjdKzrfzSBknZKgU0UJ1FbGQ/edit#gid=1144399491'
  'https://docs.google.com/spreadsheets/d/1lZkbQqKmsDuI5XnSevXSM6NZPMql3SEYxomLemUPr8Q/edit?usp=sharing'

const importLeaders = async () => {
  const auth = await authorize()

  console.log(auth)
  // console.log('Importing federal...')
  // await importSpreadsheet(db, federalMembers, auth)

  // console.log('Importing state...')
  // await importSpreadsheet(db, stateMembers, auth)

  // console.log('Adding state names and regions')
  // await addStateNameAndRegion(db)
}

importLeaders()

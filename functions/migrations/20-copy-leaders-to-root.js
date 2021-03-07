const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey-staging.json')
const { stateCodes } = require('../utilities/states')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()

console.log('copying leaders to root...')
;(async () => {
  const writes = stateCodes.map(async stateCode => {
    const leadersRef = db.collection('states').doc(stateCode).collection('leaders')
    const leaderDatas = (await leadersRef.get()).docs.map(leader => leader.data())

    await Promise.all(
      leaderDatas.map(leaderData =>
        db.collection('leaders').doc(leaderData.permaLink).set(leaderData)
      )
    )
    return console.log(`copied leaders for ${stateCode}`)
  })

  return Promise.all(writes)
})().catch(console.error)

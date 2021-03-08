const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey-staging.json')
const { stateCodes } = require('../utilities/states')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()
let currentLeaderCount = 0

;(async () => {
  const gets = stateCodes.map(async stateCode => {
    const leadersRef = db.collection('states').doc(stateCode).collection('leaders')
    const stateLeaders = (await leadersRef.get()).docs
    const leaderCount = stateLeaders.length
    currentLeaderCount = currentLeaderCount + leaderCount

    return console.log(`${stateCode} leaders count: ${leaderCount}`)
  })

  await Promise.all(gets)
  const totalLeadersCount = (await db.collection('leaders').get()).docs.length
  return console.log(
    `Sum of current leaders in /states/{stateCode}/leaders: ${currentLeaderCount} \n`,
    `Total leaders in /leaders: ${totalLeadersCount}`
  )
})().catch(console.error)

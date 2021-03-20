/* eslint-disable no-await-in-loop */
const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey-staging.json')
const { stateCodes } = require('../utilities/states')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

;(async () => {
  console.log('removing all leaders in /states/{stateCode}/leaders...')
  console.log('...so we can re-save them with PID instead of permaLink')

  for (const stateCode of stateCodes) {
    console.log({ stateCode })
    const leadersRef = db.collection('states').doc(stateCode).collection('leaders')
    const leaderDatas = (await leadersRef.get()).docs.map(leaderSnapshot => {
      return { ...leaderSnapshot.data(), id: leaderSnapshot.id }
    })
    const leaderCount = leaderDatas.length

    await Promise.all(
      leaderDatas.map(leaderData =>
        db.collection('states').doc(stateCode).collection('leaders').doc(leaderData.id).delete()
      )
    )
    console.log(`Deleted ${leaderCount} leaders from ${stateCode}`)
  }
})().catch(console.error)

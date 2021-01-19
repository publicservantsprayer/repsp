;(async () => {
  const admin = require('firebase-admin')
  const moment = require('moment')

  let serviceAccount = require('../../serviceAccountKey-staging.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  let db = admin.firestore()

  const { stateCodes } = require('../utilities/states')

  const unix2000 = moment('2000-01-01').unix()
  const startDate = admin.firestore.Timestamp.fromMillis(unix2000 * 1000)

  const posts = stateCodes.map(async stateCode => {
    const leadersRef = db.collection('states').doc(stateCode).collection('leaders')
    const leaders = (await leadersRef.get()).docs
    const noDateLeaders = leaders.filter(leader => leader.data().lastImportDate === undefined)
    console.log(
      `${stateCode} - found: ${noDateLeaders.length} / ${leaders.length} without lastImportDate`
    )

    // Update the lastImportDate of each document
    noDateLeaders.forEach(async leader => {
      console.log(`Updating ${leader.id}`)

      const leaderRef = db.collection('states').doc(stateCode).collection('leaders').doc(leader.id)

      const result = await leaderRef.set({ lastImportDate: startDate }, { merge: true })
      //console.log({ result })
    })

    return null
  })

  return Promise.all(posts)
})().catch(error => {
  console.log(error)
})

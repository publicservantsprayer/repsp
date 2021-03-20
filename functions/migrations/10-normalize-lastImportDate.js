/* eslint-disable no-await-in-loop */
const admin = require('firebase-admin')
let serviceAccount = require('../../serviceAccountKey-staging.json')
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
let db = admin.firestore()

const moment = require('moment')
const unix2000 = moment('2000-01-01').unix()
const startDate = admin.firestore.Timestamp.fromMillis(unix2000 * 1000)

const { stateCodes } = require('../utilities/states')

let updatedLeaderCount = 0
let totalLeaderCount = 0

;(async () => {
  console.log('normalizing last import date...')

  for (const stateCode of stateCodes) {
    const leadersRef = db.collection('states').doc(stateCode).collection('leaders')
    const leaders = (await leadersRef.get()).docs
    totalLeaderCount = totalLeaderCount + leaders.length

    const noDateLeaders = leaders.filter(leader => leader.data().lastImportDate === undefined)
    console.log(
      `${stateCode} - found: ${noDateLeaders.length} / ${leaders.length} without lastImportDate`
    )

    await Promise.all(
      noDateLeaders.map(async leader => {
        const leaderRef = db
          .collection('states')
          .doc(stateCode)
          .collection('leaders')
          .doc(leader.id)

        return leaderRef.set({ lastImportDate: startDate }, { merge: true })
      })
    )
    updatedLeaderCount = updatedLeaderCount + noDateLeaders.length
  }

  console.log(`Updated leader count: ${updatedLeaderCount}`)
  console.log(`Total leader count: ${totalLeaderCount}`)
})().catch(console.log)

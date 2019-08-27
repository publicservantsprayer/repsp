(async () => {
  const admin = require('firebase-admin')

  let serviceAccount = require('../../serviceAccountKey.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

  let db = admin.firestore()

  const { createDailyPost } = require('../createDailyPost')
  const { stateCodes } = require('../utilities/states')
  const dateID = process.argv[2]

  if (typeof dateID !== 'string') return console.log('Usage: createPostsForDateID YYYY-MM-DD')

  if (dateID.split('-').length !== 3) throw Error('DateID arg requires YYYY-MM-DD format')

  const posts = stateCodes.map(async stateCode => {
    await createDailyPost(db, stateCode, dateID)
    console.log(`created ${stateCode} post for ${dateID}`)
    return null
  })

  return Promise.all(posts)
})().catch(error => {
  console.log(error)
})

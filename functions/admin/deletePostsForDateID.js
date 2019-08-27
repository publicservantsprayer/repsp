(async () => {
  const admin = require('firebase-admin')

  let serviceAccount = require('../../serviceAccountKey.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

  let db = admin.firestore()

  const { stateCodes } = require('../utilities/states')
  const dateID = process.argv[2]

  if (typeof dateID !== 'string') return console.log('Usage: deletePostsForDateID YYYY-MM-DD')

  if (dateID.split('-').length !== 3) throw Error('DateID arg requires YYYY-MM-DD format')

  const deletions = stateCodes.map(async stateCode => {
    const path = `/states/${stateCode}/posts/${dateID}`
    await db.doc(path).delete()
    console.log('deleted: ', path)
    return null
  })
  return Promise.all(deletions)
})().catch(error => {
  console.log(error)
})

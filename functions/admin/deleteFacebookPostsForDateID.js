(async () => {
  const admin = require('firebase-admin')

  let serviceAccount = require('../../serviceAccountKey.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

  let db = admin.firestore()

  const { stateCodes } = require('../utilities/states')
  const dateID = process.argv[2]

  if (typeof dateID !== 'string') return console.log('Usage: createPostsForDateID YYYY-MM-DD')

  if (dateID.split('-').length !== 3) throw Error('DateID arg requires YYYY-MM-DD format')

  return Promise.all(stateCodes.map(async stateCode => {
    try {
      const facebookPostCollection = db.collection('states').doc(stateCode).collection('facebookPosts')

      await facebookPostCollection.doc(dateID).delete()


      console.log('Deleted facebook post:', dateID, stateCode)
    } catch (error) {
      console.log('Error deleting:', stateCode, error)
    }
  }))
})().catch(error => {
  console.log(error)
})

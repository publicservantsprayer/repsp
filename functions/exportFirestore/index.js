const firestore = require('@google-cloud/firestore')
const client = new firestore.v1.FirestoreAdminClient()

// https://firebase.google.com/docs/firestore/solutions/schedule-export

const bucket = 'gs://repsp123.appspot.com'

exports.exportFirestore = () => {
  const databaseName = client.databasePath('repsp123', '(default)')
  console.log('databaseName', databaseName)

  return client
    .exportDocuments({
      name: databaseName,
      outputUriPrefix: bucket,
      // Leave collectionIds empty to export all collections
      // or set to a list of collection IDs to export,
      // collectionIds: ['users', 'posts']
      collectionIds: [],
    })
    .then(responses => {
      const response = responses[0]
      console.log(`Operation Name: ${response['name']}`)
      return response
    })
    .catch(err => {
      console.error(err)
      throw new Error('Export operation failed')
    })
}

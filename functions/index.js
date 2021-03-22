const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()

const moment = require('moment-timezone')
const timezone = 'America/New_York'

const { stateCodes } = require('./utilities/states')
const { createPostPhoto } = require('./createPostPhoto')
const { createDailyPost } = require('./createDailyPost')

const { handleCreateDataImport, handleCreateDataImportStep } = require('./importSpreadsheet')
const { handleUpdateLastImport } = require('./importSpreadsheet/handleUpdateLastImport')
const {
  handleCreateDataImportRemoveStep,
} = require('./importSpreadsheet/handleCreateDataImportRemoveStep')

const rss = require('./rss')

const dateID = moment().tz(timezone).format('YYYY-MM-DD')
exports.rss = functions.https.onRequest(rss(db, dateID))

exports.createPostPhoto = functions.firestore
  .document('states/{stateCode}/posts/{date}')
  .onCreate((snap, context) => {
    const stateCode = context.params.stateCode
    const date = context.params.date
    const post = snap.data()

    return createPostPhoto(date, stateCode, post)
  })

exports.createDailyPost = functions.pubsub
  .schedule('55 4 * * *')
  .timeZone(timezone) // default is America/Los_Angeles
  .onRun(context => {
    const dateID = moment().format('YYYY-MM-DD')
    const posts = stateCodes.map(async stateCode => {
      return createDailyPost(db, stateCode, dateID)
    })

    return Promise.all(posts)
  })

exports.createFacebookPost = functions.firestore
  .document('states/{stateCode}/posts/{dateID}')
  .onCreate((snapshot, context) => {
    const stateCode = context.params.stateCode
    const dateID = context.params.dateID
    const post = snapshot.data()

    const { createFacebookPost } = require('./facebook/createFacebookPost')

    return createFacebookPost(db, dateID, stateCode, post)
  })

exports.createUserProfile = functions.auth.user().onCreate(user => {
  const { createUserProfile } = require('./userProfile/createUserProfile')

  return createUserProfile(db, user)
})

exports.scheduledFirestoreExport = functions.pubsub.schedule('every 24 hours').onRun(context => {
  const { exportFirestore } = require('./exportFirestore')

  return exportFirestore()
})

exports.handleCreateDataImport = functions.firestore
  .document('dataImports/{dataImportId}')

  .onCreate((snap, context) => {
    return handleCreateDataImport(snap, context)
  })

exports.handleCreateDataImportStep = functions.firestore
  .document('dataImports/{dataImportId}/step/{stepId}')

  .onCreate((snap, context) => {
    return handleCreateDataImportStep(snap, context)
  })

exports.handleUpdateLastImport = functions.firestore
  .document('siteConfig/dataImports')

  .onWrite((change, context) => {
    return handleUpdateLastImport(change, context)
  })

exports.handleCreateDataImportRemoveStep = functions.firestore
  .document('dataImports/{dataImportId}/removeStep/{removeStepId}')

  .onCreate((snap, context) => {
    return handleCreateDataImportRemoveStep(snap, context)
  })

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()

const moment = require('moment')

const { stateCodes } = require('./utilities/states')
const { createPostPhoto } = require('./createPostPhoto')
const { createDailyPost } = require('./createDailyPost')

exports.createPostPhoto = functions.firestore
  .document('states/{stateCode}/posts/{date}')
  .onCreate((snap, context) => {
    const stateCode = context.params.stateCode
    const date = context.params.date
    const post = snap.data()

    return createPostPhoto(date, stateCode, post)
  })

exports.createDailyPost = functions.pubsub.schedule('55 5 * * *')
  .timeZone('America/New_York') // default is America/Los_Angeles
  .onRun((context) => {
    const dateID = moment().format('YYYY-MM-DD')
    const posts = stateCodes.map(async stateCode => {
      return createDailyPost(db, stateCode, dateID)
    })

    return Promise.all(posts)
  })

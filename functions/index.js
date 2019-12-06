const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()

const moment = require('moment-timezone')
const timezone = 'America/New_York'

const { stateCodes } = require('./utilities/states')
const { createPostPhoto } = require('./createPostPhoto')
const { createDailyPost } = require('./createDailyPost')

const rss = require('./rss')

const dateID = moment()
  .tz(timezone)
  .format('YYYY-MM-DD')
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

exports.tweetDailyPosts = functions.pubsub
  .schedule('55 5 * * *')
  .timeZone(timezone) // default is America/Los_Angeles
  .onRun(context => {
    const { tweetDailyPosts } = require('./twitter/tweetDailyPosts')

    return tweetDailyPosts()
  })

exports.twitterAuthorize = functions.https.onCall((data, context) => {
  const { authorize } = require('./twitter/authorize')

  return authorize(data)
})

exports.twitterAccessToken = functions.https.onCall((data, context) => {
  const { accessToken } = require('./twitter/authorize')

  return accessToken(data)
})

exports.twitterRetweets = functions.https.onCall((data, context) => {
  const { retweets } = require('./twitter/retweets')

  return retweets(data)
})

exports.twitterCheckForLocked = functions.https.onCall((data, context) => {
  const { checkForLocked } = require('./twitter/checkForLocked')

  return checkForLocked(data)
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

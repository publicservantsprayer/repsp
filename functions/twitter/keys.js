const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()

const consumerKeys = () => {
  return {
    consumer_key: functions.config().twitter.consumer_key,
    consumer_secret: functions.config().twitter.consumer_secret,
  }
}

const bearerToken = () => {
  return {
    bearer_token: functions.config().twitter.bearer_token,
  }
}

const accountKeys = async accountName => {
  const keys = await db.collection('twitterAccounts').doc(accountName).get()

  return {
    access_token_key: keys.data().oauth_token,
    access_token_secret: keys.data().oauth_token_secret,
  }
}

module.exports.appUserKeys = async accountName => {
  return { ...consumerKeys(), ...(await accountKeys(accountName)) }
}

module.exports.appOnlyKeys = () => {
  return { ...consumerKeys(), ...bearerToken() }
}

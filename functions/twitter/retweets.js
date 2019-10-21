const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
const Twitter = require('twitter')

const consumerKeys = () => {
  return {
    consumer_key: functions.config().twitter.consumer_key,
    consumer_secret: functions.config().twitter.consumer_secret,
  }
}

const accountKeys = async (accountName) => {
  const keys = await db.collection('twitterAccounts').doc(accountName).get()

  return {
    access_token_key: keys.data().oauth_token,
    access_token_secret: keys.data().oauth_token_secret
  }
}

module.exports.retweets = async ({ accountName }) => {
  const keys = { ...consumerKeys(), ...await accountKeys(accountName) }
  const client = new Twitter(keys)
  let response
  try {
    response = await client.get('statuses/retweets_of_me', {
      count: 5,
      trim_user: true,
      include_entities: false,
      include_user_entities: false
    })
  } catch (error) {
    console.log({ error: error })
    if (Array.isArray(error) && error[0].code === 326) {
      return [{ text: error[0].message }]
    }
    else {
      throw error
    }
  }

  return response
}

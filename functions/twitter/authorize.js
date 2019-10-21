const request = require('request-promise-native')
const queryString = require('querystring')
const encodeUrl = require('encodeurl')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()
const Twitter = require('twitter')

const oauthPost = async (endpoint, oauthTokens) => {
  const consumerKey = {
    consumer_key: functions.config().twitter.consumer_key,
    consumer_secret: functions.config().twitter.consumer_secret,
  }

  const options = {
    headers: { Accept: '*/*', Connection: 'close', 'User-Agent': 'node-twitter/1' },
    oauth: { ...consumerKey, ...oauthTokens },
    url: `https://api.twitter.com/${endpoint}`,
  }

  const result = await request.post(options)

  return queryString.parse(result)
}

module.exports.authorize = async ({ accountName, callbackUrl }) => {
  const responseData = await oauthPost('oauth/request_token', {
    callback: encodeUrl(callbackUrl)
  })

  await db.collection('twitterAccounts').doc(accountName).update({
    temp_oauth_token: responseData.oauth_token,
    temp_oauth_token_secret: responseData.oauth_token_secret
  })

  const oauthTokenQueryString = queryString.stringify({ oauth_token: responseData.oauth_token })

  return { redirectUrl: `https://api.twitter.com/oauth/authorize?${oauthTokenQueryString}` }
}

module.exports.accessToken = async ({ temp_oauth_token, oauth_verifier }) => {
  const snapshot = await db.collection('twitterAccounts').where('temp_oauth_token', '==', temp_oauth_token).get()
  const doc = snapshot.docs[0].data()

  const responseData = await oauthPost('oauth/access_token', {
    token: doc.temp_oauth_token,
    token_secret: doc.temp_oauth_token_secret,
    verifier: oauth_verifier
  })

  const twitter = new Twitter({
    consumer_key: functions.config().twitter.consumer_key,
    consumer_secret: functions.config().twitter.consumer_secret,
    access_token_key: responseData.oauth_token,
    access_token_secret: responseData.oauth_token_secret
  })

  const credentials = await twitter.get('account/verify_credentials', { skip_status: true })

  await db.collection('twitterAccounts').doc(credentials.screen_name).update({
    oauth_token: responseData.oauth_token,
    oauth_token_secret: responseData.oauth_token_secret,
    credentials: credentials
  })

  return { accountName: credentials.screen_name }
}

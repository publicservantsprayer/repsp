const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()

const path = require('path')
const os = require('os')
const fs = require('fs').promises
const moment = require('moment')


const Twitter = require('twitter')

const consumerKeys = () => {
  return {
    consumer_key: functions.config().twitter.consumer_key,
    consumer_secret: functions.config().twitter.consumer_secret,
  }
}
const appAccountKeys = () => {
  return {
    access_token_key: functions.config().twitter.app_access_token_key,
    access_token_secret: functions.config().twitter.app_access_token_secret,
  }
}

const accountKeys = async (accountName) => {
  const keys = await db.collection('twitterAccounts').doc(accountName).get()

  return {
    access_token_key: keys.data().access_token_key,
    access_token_secret: keys.data().access_token_secret
  }
}

const params = { screen_name: 'psptest4' }

module.exports.postToTwitter = async () => {
  const keys = await psptest4Keys()
  const client = new Twitter(keys)
  client.post('statuses/update', { status: `another random number: ${Math.random()}` }, (error, tweets, response) => {
    if (!error) {
      console.log(tweets);
    } else {
      console.log(error)
    }
  })
}

const postsBucketName = 'repsp123-posts'
const postsBucket = admin.storage().bucket(postsBucketName)

const imageLocation = 'gs://repsp123-posts/2019/09/27/2019-09-27_psp_IN.png'
const imagePath = '2019/09/27/2019-09-27_psp_IN.png'
const imageName = '2019-09-27_psp_IN.png'

const imageDownloadPath = path.join(os.tmpdir(), imageName)

const downloadImage = async () => {

  const options = {
    destination: imageDownloadPath,
  }

  await postsBucket
    .file(imagePath)
    .download(options)

  console.log(
    `gs://${postsBucketName}/${imagePath} downloaded to ${imageDownloadPath}.`
  )
}

const postTweetWithImage = async () => {

  const data = await fs.readFile(imageDownloadPath)

  client.post('media/upload', { media: data }, (error, media, response) => {
    if (!error) {
      console.log(media);

      var status = {
        status: 'Today we are praying for: Jim Pressel, Cherrish Pryor, and Jeff Raatz.  https://thepsp.org/states/in/2019/09/27',
        media_ids: media.media_id_string
      }

      client.post('statuses/update', status, (error, tweet, response) => {
        if (!error) {
          console.log(tweet);
        }
      })
    }
  })
}

const admin = require('firebase-admin')
const db = admin.firestore()
const moment = require('moment')
const Twitter = require('twitter')
const { appUserKeys, appOnlyKeys } = require('./keys')
const { stateCodes } = require('../utilities/states')
const path = require('path')
const os = require('os')
const fs = require('fs').promises

const postsBucketName = 'repsp123-posts'
const postsBucket = admin.storage().bucket(postsBucketName)
let shortUrlLengthttps

const leaderName = leader => {
  let screenName
  if (leader.Twitter) {
    const splitted = leader.Twitter.split('/')
    screenName = splitted[splitted.length - 1]
    screenName = screenName ? '@' + screenName : null
  }
  return screenName || leader.MailName
}

const createStatusText = ({ post, dateID, stateCode }) => {
  const [year, month, day] = dateID.split('-')
  const url = `https://thepsp.org/states/${stateCode.toLowerCase()}/${year}/${month}/${day}/`
  const leaderName1 = leaderName(post.leader1)
  const leaderName2 = leaderName(post.leader2)
  const leaderName3 = leaderName(post.leader3)
  let statusText = `Today we are praying for ${leaderName1}, ${leaderName2} and ${leaderName3}`
  const statusLength = 140 - shortUrlLengthttps
  if (statusText.length > statusLength) {
    statusText = `Praying for ${leaderName1}, ${leaderName2} and ${leaderName3}`
  }
  if (statusText.length > statusLength) {
    statusText = `${leaderName1}, ${leaderName2} and ${leaderName3}`
  }
  return statusText + ' - ' + url
}

const getPost = async ({ dateID, stateCode }) => {
  const post = await db
    .collection('states')
    .doc(stateCode)
    .collection('posts')
    .doc(dateID)
    .get()
  if (!post.exists) throw new Error('Post does not exist')
  return post.data()
}

const downloadImage = async ({ dateID, stateCode }) => {
  const [year, month, day] = dateID.split('-')
  const imageName = `${dateID}_psp_${stateCode}.png`
  const imagePath = `${year}/${month}/${day}/${imageName}`

  const imageDownloadPath = path.join(os.tmpdir(), imageName)

  const downloadOptions = { destination: imageDownloadPath }

  await postsBucket.file(imagePath).download(downloadOptions)

  return imageDownloadPath
}

const uploadImageToTwitter = async downloadedImage => {
  const data = await fs.readFile(downloadedImage)
  const media = await twitter.post('media/upload', { media: data })

  return media.media_id_string
}

const postTweetWithImage = async ({ statusText, accountName, downloadedImage }) => {
  const twitter = new Twitter(await appUserKeys(accountName))

  const data = await fs.readFile(downloadedImage)
  const media = await twitter.post('media/upload', { media: data })

  return await twitter.post('statuses/update', {
    status: statusText,
    media_ids: media.media_id_string,
  })
}

const sendTweet = async ({ stateCode, accountName, dateID }) => {
  const report = db
    .collection('tweetReports')
    .doc(dateID)
    .collection('states')
    .doc(stateCode)
  await report.set({
    started: `Started tweet for ${accountName} of ${stateCode} for ${dateID}`,
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  let statusText
  try {
    const post = await getPost({ dateID, stateCode })
    statusText = createStatusText({ post, dateID, stateCode })
    await report.update({ createdStatusText: statusText, shortUrlLengthttps: shortUrlLengthttps })
  } catch (error) {
    await report.update({ error: 'Error creating status text', errorMessage: error.message })
    return null
  }

  let downloadedImage
  try {
    downloadedImage = await downloadImage({ dateID, stateCode })
    await report.update({ downloadedImage: downloadedImage })
  } catch (error) {
    await report.update({ error: 'Error downloading image', errorMessage: error.message })
    return null
  }

  let response
  try {
    response = await postTweetWithImage({ statusText, accountName, downloadedImage })
    await report.update({ response: response })
  } catch (error) {
    await report.update({ error: 'Error uploading image', errorMessage: error.message })
    return null
  }

  return response
}

module.exports.tweetDailyPosts = async () => {
  const twitter = new Twitter(appOnlyKeys())
  const config = await twitter.get('help/configuration', {})
  shortUrlLengthttps = config.short_url_length_https

  const dateID = moment().format('YYYY-MM-DD')
  const actualAccounts = stateCodes.map(stateCode => {
    return {
      stateCode: stateCode,
      accountName: `Praying4_${stateCode}`,
      dateID: dateID,
    }
  })

  const testAccounts = [
    {
      stateCode: 'IN',
      accountName: 'psptest4',
      dateID: dateID,
    },
    {
      stateCode: 'MI',
      accountName: 'psptest5',
      dateID: dateID,
    },
  ]

  //const accounts = testAccounts
  const accounts = actualAccounts

  const tweets = accounts.map(async account => await sendTweet(account))

  return Promise.all(tweets)
}

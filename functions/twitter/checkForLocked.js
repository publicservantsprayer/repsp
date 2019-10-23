const Twitter = require('twitter')
const { appUserKeys } = require('./keys')

module.exports.checkForLocked = async ({ accountName }) => {
  const twitter = new Twitter(await appUserKeys(accountName))

  try {
    await twitter.get('statuses/retweets_of_me', { count: 1, trim_user: true })
  } catch (error) {
    if (Array.isArray(error) && error[0].code === 326) {
      return { locked: true }
    }
    else {
      throw error
    }
  }

  return { locked: false }
}

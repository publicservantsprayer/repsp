const Twitter = require('twitter')
const { appUserKeys } = require('./keys')

module.exports.retweets = async ({ accountName }) => {
  const twitter = new Twitter(await appUserKeys(accountName))
  let response

  try {
    response = await twitter.get('statuses/retweets_of_me', {
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

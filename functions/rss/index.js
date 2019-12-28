const express = require('express')
const handlebars = require('express-handlebars')
const cors = require('cors')
const moment = require('moment-timezone')

const rss = (db, realDateID) => {
  const app = express()

  app.use(cors())

  app.engine('handlebars', handlebars.create().engine)
  app.set('view engine', 'handlebars')
  app.set('views', 'rss/views')

  app.get('/rss/dateID', (request, response) => {
    response.send(realDateID)
  })

  app.get('/rss/states/:stateCode', async (request, response) => {
    response.set('Content-Type', 'application/rss+xml')

    const stateCodeLower = request.params.stateCode.toLowerCase()
    const stateCodeUpper = request.params.stateCode.toUpperCase()

    let snapshot = await db
      .collection('states')
      .doc(stateCodeUpper)
      .collection('posts')
      .doc(realDateID)
      .get()

    let dateID

    const getYesterdaysPost = async () => {
      dateID = moment(realDateID)
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
      return db
        .collection('states')
        .doc(stateCodeUpper)
        .collection('posts')
        .doc(dateID)
        .get()
    }

    if (snapshot.exists) {
      dateID = realDateID
    } else {
      snapshot = await getYesterdaysPost()
    }

    const post = snapshot.data()

    const [year, month, day] = dateID.split('-')

    const title = `Public Servants' Prayer - ${moment(dateID).format('dddd, MMMM Do')}`
    const pubDate = moment(dateID).tz('America/New_York').format('ddd, DD MMM YYYY HH:mm:ss ZZ')
    const imageUrl =
      `https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/` +
      `${year}%2F${month}%2F${day}%2F${dateID}_psp_${stateCodeUpper}.png?alt=media`

    const link = `https://thepsp.org/states/${stateCodeLower}/${year}/${month}/${day}`
    const rssLink = `https://thepsp.org/rss/states/${stateCodeLower}`

    const nameAndTitle = leader => `${leader.Title} ${leader.NickName} ${leader.LastName}`

    response.render('post', {
      helpers: {
        title: () => title,
        pubDate: () => pubDate,
        imageUrl: () => imageUrl,
        link: () => link,
        rssLink: () => rssLink,
        leader1: () => nameAndTitle(post.leader1),
        leader2: () => nameAndTitle(post.leader2),
        leader3: () => nameAndTitle(post.leader3),
      },
    })
  })

  return app
}

module.exports = rss

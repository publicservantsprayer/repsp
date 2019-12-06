const express = require('express')
const handlebars = require('express-handlebars')
const cors = require('cors')
const moment = require('moment')

const rss = (db, dateID) => {
  const app = express()

  app.use(cors())

  app.engine('handlebars', handlebars.create().engine)
  app.set('view engine', 'handlebars')
  app.set('views', 'rss/views')

  app.get('/rss/states/:stateCode', async (request, response) => {
    response.set('Content-Type', 'application/rss+xml')

    const stateCodeLower = request.params.stateCode.toLowerCase()
    const stateCodeUpper = request.params.stateCode.toUpperCase()
    const [year, month, day] = dateID.split('-')

    const snapshot = await db
      .collection('states')
      .doc(stateCodeUpper)
      .collection('posts')
      .doc(dateID)
      .get()

    const post = snapshot.data()

    const title = `Public Servants' Prayer - ${moment(dateID).format('dddd, MMMM Do')}`
    const imageUrl =
      `https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/` +
      `${year}%2F${month}%2F${day}%2F${dateID}_psp_${stateCodeUpper}.png?alt=media`

    const link = `https://thepsp.org/states/${stateCodeLower}/${year}/${month}/${day}`
    const rssLink = `https://thepsp.org/rss/states/${stateCodeLower}`

    const nameAndTitle = leader => `${leader.Title} ${leader.NickName} ${leader.LastName}`

    response.render('post', {
      helpers: {
        title: () => title,
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

const firebase = require('firebase')
const request = require('supertest')

const { setup, setupAdmin, teardown } = require('../../spec/helpers')
const rss = require('./')

describe('rss', () => {
  let db

  const data = {
    'states/IN/posts/2019-09-15': {
      dateID: '2019-09-15',
      leader1: {
        NickName: 'Dennis',
        LastName: 'Kruse',
        Title: 'Indiana Senator',
      },
      leader2: {
        NickName: 'Tim',
        LastName: 'Lanane',
        Title: 'Indiana Senator',
      },
      leader3: {
        NickName: 'Ryan',
        LastName: 'Lauer',
        Title: 'Indiana Representative',
      },
    },
  }

  beforeAll(async () => (db = await setupAdmin(data)))
  afterAll(async () => await teardown())

  test('renders todays rss feed', async () => {
    const dateID = '2019-09-15'
    const app = rss(db, dateID)
    const result = await request(app).get('/rss/states/in')

    expect(result.status).toEqual(200)
    expect(result.header['access-control-allow-origin']).toEqual('*')
    expect(result.header['content-type']).toEqual('application/rss+xml; charset=utf-8')
    expect(result.text).toEqual(rssText)
  })

  test('renders yesterdays rss feed if todays does not exist', async () => {
    const dateID = '2019-09-16'
    const app = rss(db, dateID)
    const result = await request(app).get('/rss/states/in')

    expect(result.status).toEqual(200)
    expect(result.header['access-control-allow-origin']).toEqual('*')
    expect(result.header['content-type']).toEqual('application/rss+xml; charset=utf-8')
    expect(result.text).toEqual(rssText)
  })
})

var rssText = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"  xmlns:atom="http://www.w3.org/2005/Atom"  xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
        <atom:link href="https://thepsp.org/rss/states/in" rel="self" type="application/rss+xml" />
        <title>Public Servants' Prayer - Sunday, September 15th</title>
        <link>https://thepsp.org</link>
        <description>Changing the tone of politics through prayer.</description>
        <item>
            <title>Public Servants' Prayer - Sunday, September 15th</title>
            <link>https://thepsp.org/states/in/2019/09/15</link>
            <guid>https://thepsp.org/states/in/2019/09/15</guid>
            <pubDate>Sun, 15 Sep 2019 00:00:00 -0400</pubDate>
            <media:content url="https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/2019%2F09%2F15%2F2019-09-15_psp_IN.png?alt=media" type="image/png" width="100%" height="auto" />
            <description>
                Today we are praying for:
                Indiana Senator Dennis Kruse
                Indiana Senator Tim Lanane
                Indiana Representative Ryan Lauer
            </description>
            <content:encoded><![CDATA[
                <img src="https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/2019%2F09%2F15%2F2019-09-15_psp_IN.png?alt&#x3D;media" alt="leaders we are praying for" width="100%" height="auto" style="width: 100%; height: auto;" />
                <h2>Today we are praying for:</h2>
                <p>Indiana Senator Dennis Kruse</p>
                <p>Indiana Senator Tim Lanane</p>
                <p>Indiana Representative Ryan Lauer</p>
            ]]></content:encoded>
        </item>
    </channel>
</rss>`

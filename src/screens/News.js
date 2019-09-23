import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import MediaCard from '../MediaCard'

const db = [
  {
    title: 'About Us',
    image:
      'https://images.squarespace-cdn.com/content/v1/55a52fd4e4b037b6dd04e384/1516849619525-SIMH5C28K2UA4M77R4A7/ke17ZwdGBToddI8pDm48kIw2UfM4pFw-uQov_WM0sxJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQenKorOgdPvqNz1rrSY2twX-9Ss2mhmBeQBYMjFx-LvtNpR-oeFwj2Ae_lbqFbpxA/3.jpg?format=750w',
    blurb: 'Find out our mission statement, what we do, and meet the Team!',
  },
  {
    title: 'PSP Newsletters',
    image:
      'https://alphaministries.com/wp-content/uploads/2019/04/IMG_0285.jpeg',
    blurb: "Learn the current news on what's going on in PSP",
  },
  {
    title: 'Live Prayer Requests From Leaders',
    image: 'https://saintmike.com/wp-content/uploads/MilitaryPrayerList1.jpg',
    blurb:
      'Want to pray more specifically? Here are live prayer requests from our leaders.',
  },
  {
    title: 'Changing the tone of politics through prayer',
    image:
      'https://s3-ap-southeast-2.amazonaws.com/nz.dkhosting.com.au/wp-content/uploads/2017/06/22105108/B17__If-my-people-pray-1024x576.jpg',
    blurb:
      'Hear encouraging testimonies and find out what others are saying about PSP.',
  },
  {
    title: 'Pray, Give, Volunteer',
    image:
      'https://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/06/Praying-hands.jpg',
    blurb:
      'How can I help? Here are three ways you can give to encourage our leaders.',
  },
]

const ArticleGrid = ({ article }) => (
  <Grid item sm={4}>
    <MediaCard
      title={article.title}
      image={article.image}
      blurb={article.blurb}
    />
  </Grid>
)

const News = () => (
  <Container maxWidth="lg">
    <p></p>
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      spacing={10}
    >
      {db.map((article, i) => (
        <ArticleGrid article={article} key={i} />
      ))}
    </Grid>
  </Container>
)

export default News

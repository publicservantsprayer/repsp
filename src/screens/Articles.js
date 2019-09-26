import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import MediaCard from '../MediaCard'

const db = [
  {
    title: 'Live Prayer Requests From Leaders',
    image: 'https://saintmike.com/wp-content/uploads/MilitaryPrayerList1.jpg',
    blurb:
      'Want to pray more specifically? Here are live prayer requests from our leaders.',
  },
  {
    title: 'Pray, Give, Volunteer',
    image:
      'https://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/06/Praying-hands.jpg',
    blurb:
      'How can I help? Here are three ways you can give to encourage our leaders.',
  },
  {
    title: 'International Prayer with Leaders',
    image:
      'https://images.squarespace-cdn.com/content/v1/55a52fd4e4b037b6dd04e384/1516730122882-86O0JM8Q0PAKCQIUXHNN/ke17ZwdGBToddI8pDm48kBa9hJZBs0vhP4TILrFPdIZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmEczKEiHaQrO44vfJ0kKvIA2J-j_lQ9JnVm2y0-n2FU57cWDZC5qU3cZuU_QHivgV/21318833_10214446028892697_6197402969921247544_o.jpg?format=2500w',
    blurb: 'Getting a chance to pray with leaders around the world',
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

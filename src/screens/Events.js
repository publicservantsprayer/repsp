import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import MediaCard from '../MediaCard'

const db = [
  {
    title: 'Fall Banquet',
    image:
      'https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/how-do-autumn-leaves-change.jpg?itok=kGiH7Aqg',
    blurb:
      'Join us to hear what the Lord has done through PSP this past year and where we see Him leading us in the future. There are some exciting developments you will not want to miss!',
  },
  {
    title: "Women's Statehouse Day",
    image: 'https://d2g8igdw686xgo.cloudfront.net/14183641_1488832829.1848.jpg',
    blurb:
      'Women’s Statehouse Day is a very special annual event designed to bring Christian women to their capitol from all over the state of Indiana, to meet their legislators, hear from them, and pray for them.',
  },
  {
    title: 'Statehouse Prayer Service',
    image:
      'https://lakecitysmallgroups.files.wordpress.com/2017/11/prayer-e1510943911313.jpg',
    blurb:
      'The 15th Annual Statehouse Prayer Service will be held on the first day of the Indiana General Assembly session at noon on Thursday, January 3, 2019.',
  },
  {
    title: 'International Prayer with Leaders',
    image:
      'https://images.squarespace-cdn.com/content/v1/55a52fd4e4b037b6dd04e384/1516730122882-86O0JM8Q0PAKCQIUXHNN/ke17ZwdGBToddI8pDm48kBa9hJZBs0vhP4TILrFPdIZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmEczKEiHaQrO44vfJ0kKvIA2J-j_lQ9JnVm2y0-n2FU57cWDZC5qU3cZuU_QHivgV/21318833_10214446028892697_6197402969921247544_o.jpg?format=2500w',
    blurb: 'Getting a chance to pray with leaders around the world',
  },
  {
    title: 'Pastors Statehouse Day',
    image:
      'https://lakecitysmallgroups.files.wordpress.com/2017/11/prayer-e1510943911313.jpg',
    blurb:
      'Are you a pastor? Do you know your state representative and senator? These elected men and women are eager to meet the spiritual leaders in their communities.',
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

const Events = () => (
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

export default Events

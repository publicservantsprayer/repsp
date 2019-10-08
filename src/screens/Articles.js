import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import MediaCard from '../MediaCard'

const db = [
  {
    title: 'Pray, Give, Volunteer',
    image:
      'https://d3d86zle58b9ct.cloudfront.net/wp-content/uploads/sites/2/2018/06/Praying-hands.jpg',
    blurb: 'How can I help? Here are three ways you can make a difference.',
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

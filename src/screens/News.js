import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import MediaCard from '../MediaCard'
import { withFirebase } from '../Firebase'

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
export default withFirebase(({ db }) => {
  const [docs, loading, error] = useCollectionData(
    db.collection('content').where('category', '==', 'news'),
    {
      idField: 'docId',
    }
  )
  if (error) console.log('Error getting docs: ', error)

  return (
    <Container maxWidth="lg">
      <p></p>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={10}
      >
        {loading && '... loading'}
        {docs &&
          docs.map((article, i) => <ArticleGrid article={article} key={i} />)}
      </Grid>
    </Container>
  )
})

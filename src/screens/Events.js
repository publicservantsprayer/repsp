import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

import MediaCard from '../MediaCard'
import { withFirebase } from '../Firebase'

const ArticleGrid = ({ article }) => (
  <Grid item sm={4}>
    <Link component={RouterLink} to={`/event/${article.docId}`}>
      <MediaCard
        title={article.title}
        image={article.cardImage}
        blurb={article.blurb}
      />
    </Link>
  </Grid>
)
export default withFirebase(({ db }) => {
  const [docs, loading, error] = useCollectionData(
    db
      .collection('content')
      .where('category', '==', 'events')
      .orderBy('createdOn'),
    {
      idField: 'docId',
    }
  )
  if (error) console.log('Error getting docs: ', error)
  if (!docs) return null

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
        {docs.map((article, i) => (
          <ArticleGrid article={article} key={i} />
        ))}
      </Grid>
    </Container>
  )
})

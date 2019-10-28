import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

import MediaCard from '../MediaCard'
import { useContentCollection } from '../firebase'
import Screen from '../Screen'

const ArticleGrid = ({ article }) => (
  <Grid item sm={4}>
    <Link component={RouterLink} to={`/${article.category}/${article.docId}`}>
      <MediaCard
        title={article.title}
        image={article.cardImage}
        blurb={article.blurb}
      />
    </Link>
  </Grid>
)

export default ({ category }) => {
  const [docs, loading] = useContentCollection(category)

  return (
    <Screen>
      <Container maxWidth="lg">
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
    </Screen>
  )
}

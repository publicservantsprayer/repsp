import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { Link as RouterLink } from 'react-router-dom'

import MediaCard from '../MediaCard'
import { useContentCollection } from '../utilities/firebase'
import Screen from '../Screen'
import Title from '../Screen/Title'

const ArticleGrid = ({ article }) => (
  <Grid item sm={4}>
    <Link component={RouterLink} to={`/${article.category}/${article.docId}`}>
      <MediaCard title={article.title} image={article.cardImage} blurb={article.blurb} />
    </Link>
  </Grid>
)

export default function ContentCollection({ category }) {
  const [docs, loading] = useContentCollection(category)
  const capitalizeFirstLetter = word => word[0].toUpperCase() + word.slice(1).toLowerCase()

  return (
    <Screen>
      <Container maxWidth="lg">
        <Box pt={4} px={4}>
          <Title>{capitalizeFirstLetter(category)}</Title>
        </Box>
        <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={4}>
          {loading && '... loading'}
          {docs && docs.map((article, i) => <ArticleGrid article={article} key={i} />)}
        </Grid>
      </Container>
    </Screen>
  )
}

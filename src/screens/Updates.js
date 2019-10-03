import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { useDownloadURL } from 'react-firebase-hooks/storage'

import { useContentCollection, useFirebase } from '../firebase'
import { H2 } from '../utilities/formating'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}))

const ArticleGrid = ({ article }) => {
  const classes = useStyles()
  const { storageRef } = useFirebase()
  const image = article.cardImage ? article.cardImage : article.images[0]

  const [src, loading, error] = useDownloadURL(
    storageRef.child('content/' + image)
  )

  if (error) console.log('Error loading image: ', error)

  return (
    <Grid item sm={4}>
      <Paper className={classes.root}>
        <Box maxWidth={350} height="auto" mx={2} my={2} px={2} py={2}>
          <Box>
            <H2>
              {moment(article.createdOn.toDate()).format('MMMM Do, YYYY')}
            </H2>
          </Box>
          <Box>
            {loading && <p>Loading...</p>}
            {image && src && <img style={{ width: '100%' }} src={src} alt="" />}
          </Box>
          <Box>{article.content}</Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default () => {
  const [docs, loading] = useContentCollection('updates')

  if (docs) console.log(docs)

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={10}
      >
        {loading && <p>Loading...</p>}
        {docs &&
          docs.map((article, i) => <ArticleGrid article={article} key={i} />)}
      </Grid>
    </Container>
  )
}

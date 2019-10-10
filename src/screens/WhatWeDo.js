import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { useDownloadURL } from 'react-firebase-hooks/storage'

import { useContentCollection, useFirebase } from '../firebase'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    margin: 30,
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
  
  <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          variant="fullWidth"
        >
          <Tab label="Federal Senate" />
          <Tab label="Federal House" />
          <Tab label="State Senate" />
          <Tab label="State House" />
        </Tabs>
  </AppBar>
      <div>
        <TabPanel currentTab={currentTab} index={0} leaders={fedSenate} />
        <TabPanel currentTab={currentTab} index={1} leaders={fedHouse} />
        <TabPanel currentTab={currentTab} index={2} leaders={stateSenate} />
      </div>
      
  return (
    <Box bgcolor="common.white" px={3} py={1}>
      <Grid item sm={4}>
        <Paper className={classes.root}>
          <Box
            maxWidth={375}
            height="auto"
            mx={2}
            my={2}
            px={1}
            py={2}
            boxShadow={9}
            bgcolor="common.white"
            color="common.black"
          >
            <Box>
              <h1>
                {moment(article.createdOn.toDate()).format('MMMM Do, YYYY')}
              </h1>
            </Box>
            <Box>
              {loading && <p>Loading...</p>}
              {image && src && (
                <img style={{ width: '100%' }} src={src} alt="" />
              )}
            </Box>
            <Box>{article.content}</Box>
          </Box>
        </Paper>
      </Grid>
    </Box>
  )
}

export default () => {
  const [docs, loading] = useContentCollection('whatwedo')

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




import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import { useDownloadURL } from 'react-firebase-hooks/storage'
import Screen from '../Screen'

import { useContentCollection, useFirebase, useAdmin } from '../firebase'
import { H2, ScreenTitle } from '../utilities/formating'
import ContentScreen from '../ContentScreen'
import Markdown from '../Markdown'
import useStyles from '../utilities/useStyles'
import UpdateButtons from '../Content/UpdateButtons'

const Post = ({ post }) => {
  const [admin] = useAdmin()
  const classes = useStyles()
  const { storageRef } = useFirebase()
  const image = post.cardImage ? post.cardImage : post.images[0]

  const [src, loading, error] = useDownloadURL(
    storageRef.child('content/' + image)
  )

  if (error) console.log('Error loading image: ', error)

  return (
    <Box my={4}>
      <Paper>
        <Box p={2}>
          <H2>{moment(post.createdOn.toDate()).format('MMMM Do, YYYY')}</H2>
          <Box my={2}>
            {loading && <p>Loading...</p>}
            {image && src && (
              <img style={{ width: '100%' }} src={src} alt="" className={classes.borderRadius} />
            )}
          </Box>
          <Box my={2}>
            <Markdown>{post.content}</Markdown>
          </Box>

          {admin && <Box my={2}><UpdateButtons content={post} /></Box>}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default () => {
  const [posts, loading] = useContentCollection('updates')

  return (
    <Screen>
      <ContentScreen>
        <ScreenTitle>Matt's Updates</ScreenTitle>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post, i) => <Post post={post} key={i} />)}
      </ContentScreen>
    </Screen>
  )
}

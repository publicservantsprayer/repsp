import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import Markdown from '../Markdown'
import { useContentItem } from '../firebase'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export default () => {
  const classes = useStyles()
  const [doc, loading] = useContentItem()

  return (
    <Box className={classes.root}>
      {loading && <p>Loading...</p>}
      {doc && (
        <Box p={1}>
          <h2>{doc.title}</h2>
          <hr />
          <Markdown>{doc.content}</Markdown>
        </Box>
      )}
    </Box>
  )
}

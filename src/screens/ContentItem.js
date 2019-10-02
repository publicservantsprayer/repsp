import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'

import Markdown from '../Markdown'
import { useContentItem } from '../firebase'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export default ({ docId, children }) => {
  const classes = useStyles()
  const params = useParams()
  if (!docId) docId = params.docId
  const [doc, loading] = useContentItem(docId)

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
      {children}
    </Box>
  )
}

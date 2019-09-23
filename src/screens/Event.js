import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import { useDocumentData } from 'react-firebase-hooks/firestore'
import Markdown from '../Markdown'
import { withFirebase } from '../Firebase'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export default withFirebase(({ db }) => {
  const [doc, loading, error] = useDocumentData(
    db.collection('content').doc('category', '==', 'event')
  )
  const classes = useStyles()
  if (error) console.log('Error getting event: ', error)
  return (
    <box className={classes.root}>
      {doc && (
        <Box p={1}>
          <h2>{doc.title}</h2>
          <hr />
          <Markdown>{doc.content}</Markdown>
        </Box>
      )}
    </box>
  )
})

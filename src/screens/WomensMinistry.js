import React from 'react'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { withFirebase } from '../firebase'
import Markdown from '../Markdown'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export default withFirebase(({ db }) => {
  const [doc, , error] = useDocumentData(
    db.collection('content').doc('womens-ministry')
  )
  const classes = useStyles()
  if (error) console.log('Error getting womens-ministry: ', error)

  return (
    <Box className={classes.root}>
      {doc && (
        <Box p={1}>
          <h2>{doc.title}</h2>
          <hr />
          <div>
            <Link to="https://youtu.be/ja2zlR1hT5U">
              Women's Ministry Video
            </Link>
          </div>
          <Markdown>{doc.content}</Markdown>
        </Box>
      )}
    </Box>
  )
})

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import { withFirebase } from '../Firebase'
import ImageUpload from './ImageUpload'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}))

const UpdateButtons = ({ content, handleEdit }) => {
  const classes = useStyles()
  const [showUpdateImages, setShowUpdateImages] = useState(false)

  const handleUpdateImages = () => {
    setShowUpdateImages(true)
  }

  const handleDoneUpdatingImages = () => {
    setShowUpdateImages(false)
  }

  return (
    <>
      {showUpdateImages && <ImageUpload content={content} />}

      {!showUpdateImages &&
        <Button variant="contained" color="primary" className={classes.button} onClick={handleEdit(content.docId)}>
          <EditIcon className={classes.leftIcon} />Edit
        </Button>}

      {!showUpdateImages &&
        <Button variant="contained" color="primary" onClick={handleUpdateImages}>Update Images</Button>}

      {showUpdateImages &&
        <Button variant="contained" color="secondary" onClick={handleDoneUpdatingImages}>Done</Button>}
    </>
  )
}

export default withFirebase(({ db, handleEdit }) => {
  const [docs, loading, error] = useCollectionData(
    db.collection('content'),
    { idField: 'docId' }
  )

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {docs && (
        <span>
          {docs.map(content => (
            <Box m={2} key={content.docId}>
              <Paper>
                <Box p={2} key={content.docId}>
                  <h2>{content.title}</h2>
                  <p>{content.blurb}</p>
                  <UpdateButtons content={content} handleEdit={handleEdit} />
                </Box>
              </Paper>
            </Box>
          ))}
        </span>
      )}
    </>
  )
})


import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import { withFirebase } from '../Firebase'

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

export default withFirebase(({ db, handleEdit }) => {
  const classes = useStyles()
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
          {docs.map(value => (
            <Box m={2} key={value.docId}>
              <Paper>
                <Box p={2} key={value.docId}>
                  <h2>{value.title}</h2>
                  <p>{value.blurb}</p>
                  <Button variant="contained" color="primary" className={classes.button} onClick={handleEdit(value.docId)}>
                    <EditIcon className={classes.leftIcon} />
                    Edit
                    </Button>
                </Box>
              </Paper>
            </Box>
          ))}
        </span>
      )}
    </>
  )
})


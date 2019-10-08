import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'

import { withFirebase } from '../firebase'

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
}))

export default withFirebase(({ db, docValues, showList }) => {
  const classes = useStyles()
  const history = useHistory()
  const [openConfirm, setOpenConfirm] = useState(false)
  const handleDelete = docValues => {
    setOpenConfirm(true)
  }
  const handleConfirmDelete = docId => async event => {
    await db
      .collection('content')
      .doc(docId)
      .delete()
    console.log('deleted')
    setOpenConfirm(false)
    history.goBack()
  }
  const handleCancelDelete = () => {
    setOpenConfirm(false)
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleDelete}
      >
        Delete{' '}
        <DeleteIcon className={classes.rightIcon} onClick={handleDelete} />
      </Button>
      <Dialog
        open={openConfirm}
        onClose={handleCancelDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Delete this content?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>{docValues.title}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete(docValues.docId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
})

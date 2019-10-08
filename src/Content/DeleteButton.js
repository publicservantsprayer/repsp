import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'

import { useFirebase } from '../firebase'

export default ({ docValues }) => {
  const { db } = useFirebase()
  const theme = useTheme()
  const history = useHistory()
  const [openConfirm, setOpenConfirm] = React.useState(false)

  const handleDelete = docValues => setOpenConfirm(true)

  const handleCancelDelete = () => setOpenConfirm(false)

  const handleConfirmDelete = docId => async () => {
    await db
      .collection('content')
      .doc(docId)
      .delete()
    setOpenConfirm(false)
    history.goBack()
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginRight: theme.spacing(1) }}
        onClick={handleDelete}
      >
        Delete{' '}
        <DeleteIcon style={{ marginRight: theme.spacing(1) }} onClick={handleDelete} />
      </Button>
      <Dialog
        open={openConfirm}
        onClose={handleCancelDelete}
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
}

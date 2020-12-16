import React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { useFirebase } from '../utilities/firebase'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

// const useUpsert = async ({ collection }) => {
//   try {
//     if (values.docId) {
//       await db.collection('dataImports').doc(values.docId).set(values)
//     } else {
//       await db.collection('dataImports').add({ date: timestamp, ...values })
//     }
//   } catch (error) {
//     console.log('Error writing to db: ', error)
//   }
// }

export function ImportForm({ handleCancel }) {
  const classes = useStyles()
  const { firebase, db } = useFirebase()
  const [values, setValues] = React.useState()

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSave = async () => {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date())
    try {
      if (values.docId) {
        await db.collection('dataImports').doc(values.docId).set(values)
      } else {
        await db.collection('dataImports').add({ date: timestamp, ...values })
      }
    } catch (error) {
      console.log('Error writing to db: ', error)
    }
  }

  return (
    <Paper>
      <FormControl>
        <TextField
          // field="federalMembersUrl"
          label="Federal Members URL"
          helperText="Full Google Sheet URL for Federal Members"
          margin="normal"
          variant="outlined"
          onChange={handleChange('federalMembersUrl')}
          fullWidth
        />
        <TextField
          // field="stateMembersUrl"
          label="State Members URL"
          helperText="Full Google Sheet URL for State Members"
          margin="normal"
          variant="outlined"
          onChange={handleChange('stateMembersUrl')}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleSave}>
          Save
        </Button>
      </FormControl>
    </Paper>
  )
}

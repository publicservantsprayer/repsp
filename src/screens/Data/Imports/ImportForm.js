import React from 'react'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Paper from '@material-ui/core/Paper'
import { useFirebase } from '../../../utilities/firebase'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export function ImportForm({ closeForm }) {
  const classes = useStyles()
  const { firebase, db } = useFirebase()
  const [values, setValues] = React.useState()
  const history = useHistory()

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSave = async () => {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date())
    let results
    try {
      results = await db.collection('dataImports').add({ date: timestamp, ...values })
      console.log({ results })
      history.push(`/data/imports/${results.id}`)
      closeForm()
    } catch (error) {
      console.log('Error writing to db: ', error)
    }
  }

  return (
    <Paper>
      <Box display="flex" flexDirection="column" padding={2}>
        <TextField
          label="Federal Members URL"
          helperText="Full Google Sheet URL for Federal Members"
          margin="normal"
          variant="outlined"
          onChange={handleChange('federalMembersUrl')}
          fullWidth
        />
        <TextField
          label="State Members URL"
          helperText="Full Google Sheet URL for State Members"
          margin="normal"
          variant="outlined"
          onChange={handleChange('stateMembersUrl')}
          fullWidth
        />
        <ButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={closeForm}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  )
}

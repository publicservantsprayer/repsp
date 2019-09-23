import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

import { withFirebase } from '../Firebase'
import TextField from './TextField'
import SelectField from './SelectField'
import DeleteButton from './DeleteButton'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))


export default withFirebase(({ db, docValues, handleCancel, showList, showDelete }) => {
  const classes = useStyles()
  const [values, setValues] = React.useState(docValues)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSave = async () => {
    try {
      await db.collection('content').doc(values.docId).set(values)
      showList()
    }
    catch (error) {
      console.log('Error writing to db: ', error)
    }
  }

  const commonFieldProps = {
    values: values,
    handleChange: handleChange,
  }

  return (
    <Box m={2}>
      <Paper>
        <Container>
          <form noValidate autoComplete="off">
            <SelectField field="category" label="Category" {...commonFieldProps}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="news">News</MenuItem>
              <MenuItem value="events">Events</MenuItem>
              <MenuItem value="updates">Updates</MenuItem>
              <MenuItem value="articles">Articles</MenuItem>
            </SelectField>

            <TextField field="docId" label="Unique ID" {...commonFieldProps} />
            <TextField field="title" label="Title" {...commonFieldProps} />
            <TextField field="blurb" label="Blurb" multiline rows={2} {...commonFieldProps} />
            <TextField field="content" label="Content" multiline rows={8} {...commonFieldProps} />

            <Box py={2}>
              <Button variant="contained" color="primary" className={classes.button} onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" className={classes.button} onClick={handleSave}>
                Save
              </Button>
              {showDelete && <DeleteButton showList={showList} docValues={docValues} />}
            </Box>
          </form>
        </Container>
      </Paper>
    </Box >
  )
})

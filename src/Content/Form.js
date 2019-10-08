import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { H1 } from '../utilities/formating'
import Markdown from '../Markdown'
import { useFirebase } from '../firebase'
import TextField from './TextField'
import SelectField from './SelectField'
import DeleteButton from './DeleteButton'
import ImageCodes from './ImageCodes'
import DatePicker from './DatePicker'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export default ({ docValues, isNew }) => {
  const { firebase, db } = useFirebase()
  const classes = useStyles()
  const [values, setValues] = useState(docValues)
  const defaultDate = values.createdOn ? values.createdOn.toDate() : new Date()
  const [selectedDate, setSelectedDate] = useState(defaultDate)
  const history = useHistory()

  const handleDateChange = date => {
    setSelectedDate(date)
    const firebaseDate = firebase.firestore.Timestamp.fromDate(new Date(date))
    setValues({ ...values, createdOn: firebaseDate })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleCancel = () => {
    history.goBack()
  }

  const handleSave = async () => {
    try {
      if (values.docId) {
        await db
          .collection('content')
          .doc(values.docId)
          .set(values)
      } else {
        await db.collection('content').add(values)
      }
      history.goBack()
    } catch (error) {
      console.log('Error writing to db: ', error)
    }
  }

  const commonFieldProps = {
    values: values,
    handleChange: handleChange,
  }

  return (
    <>
      <Box m={2}>
        <Paper>
          <Container>
            <form noValidate autoComplete="off">
              <TextField
                field="docId"
                label="Unique ID"
                disabled={!isNew}
                {...commonFieldProps}
              />
              <SelectField
                field="category"
                label="Category"
                {...commonFieldProps}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="news">News</MenuItem>
                <MenuItem value="events">Events</MenuItem>
                <MenuItem value="updates">Updates</MenuItem>
                <MenuItem value="articles">Articles</MenuItem>
              </SelectField>
              <DatePicker value={selectedDate} onChange={handleDateChange} />

              <TextField field="title" label="Title" {...commonFieldProps} />
              {!isNew && <TextField
                field="cardImage"
                label="Card Image"
                {...commonFieldProps}
              />}
              <TextField
                field="blurb"
                label="Blurb"
                multiline
                rows={2}
                {...commonFieldProps}
              />
              <TextField
                field="content"
                label="Content"
                multiline
                rows={16}
                {...commonFieldProps}
              />

              <ImageCodes images={values.images} />

              <Box py={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleSave}
                >
                  Save
                </Button>
                {!isNew && (
                  <DeleteButton docValues={docValues} />
                )}
              </Box>
            </form>
          </Container>
        </Paper>
      </Box>

      <Box m={2}>
        <Paper>
          <AppBar position="static">
            <Box p={1} mx={1}><em>PREVIEW</em></Box>
          </AppBar>
          <Box p={2}>
            <H1>{values.title}</H1>
            <Markdown>{values.content}</Markdown>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

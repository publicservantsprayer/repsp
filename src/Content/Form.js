import 'date-fns'
import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import { H1 } from '../utilities/formating'
import Markdown from '../Markdown'
import { useFirebase } from '../firebase'
import TextField from './TextField'
import SelectField from './SelectField'
import DeleteButton from './DeleteButton'
import { useDownloadURL } from 'react-firebase-hooks/storage'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

const ImageCodes = ({ images }) => {
  const [show, setShow] = useState(false)
  const toggleImageCode = () => {
    console.log('toggled, show = ', show)
    setShow(!show)
  }
  if (!images) return null
  if (Object.keys(images).length < 1) return null

  return (
    <>
      <Button variant="outlined" onClick={toggleImageCode}>
        Image Codes
      </Button>
      {show && images.map(image => <ImageCode image={image} key={image} />)}
    </>
  )
}

const ImageCode = ({ image }) => {
  const { storageRef } = useFirebase()
  const [src, , error] = useDownloadURL(storageRef.child('content/' + image))
  const [copyText, setCopyText] = useState('Copy Snippet')

  if (error) console.log('Error loading image code: ', error)
  if (!src) return null

  const handleCopy = () => {
    navigator.clipboard.writeText('![Alt text](' + src + ' "Optional Title")')
    setCopyText('Snippet Copied')
  }
  return (
    <Box p={2}>
      <img style={{ width: '100%' }} src={src} alt="" />
      <Box
        p={1}
        bgcolor="primary.dark"
        border={1}
        fontSize={10}
        fontFamily="Monospace"
        overflow="hidden"
      >
        <code>
          <pre>{'![Alt text](' + src + ' "Optional Title")'}</pre>
        </code>
        <Button variant="outlined" size="small" onClick={handleCopy}>
          {copyText}
        </Button>
      </Box>
    </Box>
  )
}

export default ({
  docValues,
  handleCancel,
  showList,
  showDelete,
  idReadOnly,
}) => {
  const { firebase, db } = useFirebase()
  const classes = useStyles()
  const [values, setValues] = useState(docValues)
  const defaultDate = values.createdOn ? values.createdOn.toDate() : new Date()
  const [selectedDate, setSelectedDate] = useState(defaultDate)

  const handleDateChange = date => {
    setSelectedDate(date)
    const firebaseDate = firebase.firestore.Timestamp.fromDate(new Date(date))
    setValues({ ...values, createdOn: firebaseDate })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
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
      showList()
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Created on"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <SelectField
                field="category"
                label="Category"
                {...commonFieldProps}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="news">News</MenuItem>
                <MenuItem value="events">Events</MenuItem>
                <MenuItem value="updates">Updates</MenuItem>
                <MenuItem value="articles">Articles</MenuItem>
              </SelectField>

              <TextField
                field="docId"
                label="Unique ID"
                disabled={idReadOnly}
                {...commonFieldProps}
              />
              <TextField field="title" label="Title" {...commonFieldProps} />
              <TextField
                field="cardImage"
                label="CardImage"
                {...commonFieldProps}
              />
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
                {showDelete && (
                  <DeleteButton showList={showList} docValues={docValues} />
                )}
              </Box>
            </form>
          </Container>
        </Paper>
      </Box>

      <Box m={2}>
        <Paper>
          <Container>
            <H1>{values.title}</H1>
            <Markdown>{values.content}</Markdown>
          </Container>
        </Paper>
      </Box>
    </>
  )
}

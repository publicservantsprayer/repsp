import React from 'react'
import MuiTextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import MuiSelect from '@material-ui/core/Select'

import { withFirebase } from '../Firebase'
import DeleteButton from './DeleteButton'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const TextField = ({ field, values, handleChange, ...rest }) => {
  return (
    <MuiTextField
      id={field}
      onChange={handleChange(field)}
      value={values[field]}
      margin="normal"
      variant="outlined"
      fullWidth
      {...rest}
    />
  )
}

const Select = ({ values, handleChange }) => {
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  if (!values.category) values.category = ''

  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      <InputLabel ref={inputLabel} htmlFor="category">
        Category
      </InputLabel>
      <MuiSelect
        variant="outlined"
        value={values.category}
        onChange={handleChange('category')}
        labelWidth={labelWidth}
        inputProps={{
          name: 'category',
          id: 'category',
        }}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="news">News</MenuItem>
        <MenuItem value="events">Events</MenuItem>
        <MenuItem value="updates">Updates</MenuItem>
        <MenuItem value="articles">Articles</MenuItem>
      </MuiSelect>
    </FormControl>
  )
}

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

  return (
    <Box m={2}>
      <Paper>
        <Container>
          <form noValidate autoComplete="off">
            <Select handleChange={handleChange} values={values} />

            <TextField
              field="docId"
              label="Unique ID"
              InputLabelProps={{
                disableAnimation: false
              }}
              values={values}
              handleChange={handleChange}
            />

            <TextField
              field="title"
              label="Title"
              InputLabelProps={{
                disableAnimation: false
              }}
              values={values}
              handleChange={handleChange}
            />

            <TextField
              field="blurb"
              label="Blurb"
              multiline
              rows={2}
              InputLabelProps={{
                disableAnimation: false
              }}
              values={values}
              handleChange={handleChange}
            />

            <TextField
              field="content"
              label="Content"
              multiline
              rows={8}
              InputLabelProps={{
                disableAnimation: false
              }}
              values={values}
              handleChange={handleChange}
            />

            <Box p={2}>
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

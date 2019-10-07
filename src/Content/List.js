import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'

import { useContentCollection } from '../firebase'
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

      {!showUpdateImages && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleEdit(content.docId)}
        >
          <EditIcon className={classes.leftIcon} />
          Edit
        </Button>
      )}

      {!showUpdateImages && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateImages}
        >
          Update Images
        </Button>
      )}

      {showUpdateImages && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDoneUpdatingImages}
        >
          Done
        </Button>
      )}
    </>
  )
}

const ContentItem = ({ content, handleEdit }) => {
  return (
    <Box m={2} key={content.docId}>
      <Paper>
        <Box p={2} key={content.docId}>
          <h2>{content.title}</h2>
          <p>{content.blurb}</p>
          <UpdateButtons content={content} handleEdit={handleEdit} />
        </Box>
      </Paper>
    </Box>
  )
}

const ContentCategory = ({ docs, handleEdit }) => {
  return (
    <>
      <hr />
      {docs.map((doc, i) => (
        <ContentItem content={doc} key={i} handleEdit={handleEdit} />
      ))}
    </>
  )
}
const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

export default ({ handleEdit }) => {
  const categories = ['', 'news', 'events', 'updates', 'articles']
  const categoryDocs = categories.map(category => {
    const [docs] = useContentCollection(category)
    return docs
  })
  const [tabIndex, setTabIndex] = React.useState(0)
  const handleChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  if (categoryDocs.some(docs => !docs)) return null

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="None" />
          <Tab label="News" />
          <Tab label="Events" />
          <Tab label="Updates" />
          <Tab label="Articles" />
        </Tabs>
      </AppBar>
      {categoryDocs && (
        <>
          {categoryDocs.map((docs, i) => (
            <TabPanel value={tabIndex} key={i} index={i}>
              <ContentCategory docs={docs} handleEdit={handleEdit} />
            </TabPanel>
          ))}
        </>
      )}
    </>
  )
}

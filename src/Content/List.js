import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'

import { useContentCollection } from '../utilities/firebase'
import UpdateButtons from './UpdateButtons'

const ContentItem = ({ content }) => {
  return (
    <Box m={2} key={content.docId}>
      <Paper>
        <Box p={2} key={content.docId}>
          <h2>{content.title}</h2>
          <p>{content.blurb}</p>
          <UpdateButtons content={content} />
        </Box>
      </Paper>
    </Box>
  )
}

const ContentCategory = ({ docs }) => {
  if (!docs) return null

  return (
    <>
      {docs.map((doc, i) => (
        <ContentItem content={doc} key={i} />
      ))}
    </>
  )
}
const TabPanel = ({ children, value, index }) => {
  return (
    <Typography component="div" role="tabpanel" hidden={value !== index}>
      <Box p={0}>{children}</Box>
    </Typography>
  )
}

export default function List() {
  const [tabIndex, setTabIndex] = React.useState(0)
  const docs = useContentCollection('')
  const events = useContentCollection('events')
  const updates = useContentCollection('updates')
  const articles = useContentCollection('articles')

  const handleChange = (event, newValue) => setTabIndex(newValue)

  return (
    <>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleChange} textColor="secondary">
          <Tab label="None" />
          <Tab label="Events" />
          <Tab label="Updates" />
          <Tab label="Articles" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <ContentCategory docs={docs} />
      </TabPanel>
      <TabPanel value={tabIndex} index={0}>
        <ContentCategory docs={events} />
      </TabPanel>
      <TabPanel value={tabIndex} index={0}>
        <ContentCategory docs={updates} />
      </TabPanel>
      <TabPanel value={tabIndex} index={0}>
        <ContentCategory docs={articles} />
      </TabPanel>
    </>
  )
}

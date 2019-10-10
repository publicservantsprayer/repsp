import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'

import { useContentCollection } from '../firebase'
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

export default () => {
  const categories = ['', 'events', 'updates', 'articles']
  const [tabIndex, setTabIndex] = React.useState(0)
  const categoryDocs = categories.map(category => {
    const [docs] = useContentCollection(category)
    return docs
  })

  const handleChange = (event, newValue) => setTabIndex(newValue)

  if (categoryDocs.some(docs => !docs)) return null

  return (
    <>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="None" />
          <Tab label="Events" />
          <Tab label="Updates" />
          <Tab label="Articles" />
        </Tabs>
      </AppBar>
      {categoryDocs && (
        <>
          {categoryDocs.map((docs, i) => (
            <TabPanel value={tabIndex} key={i} index={i}>
              <ContentCategory docs={docs} />
            </TabPanel>
          ))}
        </>
      )}
    </>
  )
}

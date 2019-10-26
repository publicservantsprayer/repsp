import React from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from './Tab'
import AppBar from '@material-ui/core/AppBar'
import EmailIcon from 'mdi-material-ui/Email'
import FacebookIcon from 'mdi-material-ui/FacebookBox'
import TwitterIcon from 'mdi-material-ui/TwitterBox'
//import InstagramIcon from 'mdi-material-ui/Instagram'
import ExpansionPanel from './ExpansionPanel'
import TwitterTimeline from '../TwitterTimeline'
import { useStateCode } from '../utilities/states'
import PrayingForTitle from './PrayingForTitle'
import LeaderPhoto from './LeaderPhoto'

const TabPanel = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" p={3} hidden={value !== index}>
      {children}
    </Box>
  )
}

export default ({ post }) => {
  const stateCode = useStateCode()
  const [tabIndex, setTabIndex] = React.useState(0)

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex)
  }

  return (
    <Box bgcolor="common.black" mx="auto" maxWidth="430px" borderRadius="borderRadius">
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleChange} variant="standard">
          <Tab label="Today" />
          <Tab icon={<EmailIcon />} />
          <Tab icon={<FacebookIcon />} />
          <Tab icon={<TwitterIcon />} />
          {/* <Tab label={<InstagramIcon />} /> */}
        </Tabs>
      </AppBar>

      <TabPanel value={tabIndex} index={0}>
        <Box mb={1} textAlign="center">
          {moment(post.dateID).format('dddd, MMMM Do')}
        </Box>

        <PrayingForTitle dateID={post.dateID} />

        <Box display="flex" justifyContent="space-around">
          <LeaderPhoto leader={post.leader1} />
          <LeaderPhoto leader={post.leader2} />
          <LeaderPhoto leader={post.leader3} />
        </Box>

        <Box my={2}>
          <ExpansionPanel leader={post.leader1} />
          <ExpansionPanel leader={post.leader2} />
          <ExpansionPanel leader={post.leader3} />
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        Subscribe via Email
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        Follow on Facebook
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <Paper>
          <TwitterTimeline accountName={`Praying4_${stateCode}`} />
        </Paper>
      </TabPanel>

      <TabPanel value={tabIndex} index={4}>
        Follow on Instagram
      </TabPanel>
    </Box>
  )
}

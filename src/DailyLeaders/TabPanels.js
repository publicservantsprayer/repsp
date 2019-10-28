import React from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import ExpansionPanel from './ExpansionPanel'
import TwitterTimeline from '../TwitterTimeline'
import useUSAState from '../utilities/useUSAState'
import PrayingForTitle from './PrayingForTitle'
import LeaderPhoto from './LeaderPhoto'

export const TabPanel = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" p={3} hidden={value !== index}>
      {children}
    </Box>
  )
}

export default ({ tabIndex, post }) => {
  const { stateCode } = useUSAState()

  return (<>
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
      <Paper>Subscribe via Email</Paper>
    </TabPanel>

    <TabPanel value={tabIndex} index={2}>
      <Paper>Follow on Facebook</Paper>
    </TabPanel>

    <TabPanel value={tabIndex} index={3}>
      <Paper>
        <TwitterTimeline accountName={`Praying4_${stateCode}`} />
      </Paper>
    </TabPanel>

    <TabPanel value={tabIndex} index={4}>
      <Paper>Follow on Instagram</Paper>
    </TabPanel>
  </>)
}

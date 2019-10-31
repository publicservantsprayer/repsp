import React from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import ExpansionPanel from './ExpansionPanel'
import TwitterTimeline from '../TwitterTimeline'
import useUSAState from '../utilities/useUSAState'
import PrayingForTitle from './PrayingForTitle'
import LeaderPhoto from './LeaderPhoto'
import FacebookTimeline from '../FacebookTimeline'
import { H2, H3, P, P2 } from '../utilities/formating'
import EmailSignIn from '../SignIn/EmailSignIn'
import { Divider } from '@material-ui/core'
import DesktopOnly from '../DesktopOnly'
import MobileOnly from '../MobileOnly'

export const TabPanel = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" p={3} hidden={value !== index}>
      {children}
    </Box>
  )
}

export default ({ tabIndex, post }) => {
  const { stateCode, stateName } = useUSAState()

  return (
    <>
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
        <Paper>
          <Box p={2} textAlign="center" maxWidth="440px">
            <MobileOnly>
              <H3>Get on the Mailing List</H3>
            </MobileOnly>
            <DesktopOnly>
              <H2>Get on the Mailing List</H2>
            </DesktopOnly>
            <Box p={1}>
              <Divider />
              <Box pt={3} pb={1}>
                <P>
                  We will send you one email each morning with three legislators from {stateName} to
                  pray for.
                </P>
              </Box>
            </Box>
            <EmailSignIn
              buttonText="Sign me up"
              sentMessage="We sent you a confirmation link.  Check your email now and click the link to confirm."
              errorMessage="Error sending you a confirmation link.  Please try again."
            />
            <Box px={1} py={3}>
              <P2>
                (We won't spam you. You can, however, use your email to sign into the website and
                change your Mailing List settings.)
              </P2>
            </Box>
          </Box>
        </Paper>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <Paper>
          <FacebookTimeline />
        </Paper>
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <Paper>
          <TwitterTimeline accountName={`Praying4_${stateCode}`} />
        </Paper>
      </TabPanel>

      <TabPanel value={tabIndex} index={4}>
        <Paper>Follow on Instagram</Paper>
      </TabPanel>
    </>
  )
}

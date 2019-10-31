import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Typography, Divider } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

import useUSAState from '../utilities/useUSAState'
import MobileOnly from '../MobileOnly'
import DesktopOnly from '../DesktopOnly'

const P = ({ children }) => (
  <Box mx={1} my={2}>
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  </Box>
)

export default ({ setTabIndex }) => {
  const { stateName } = useUSAState()

  const scrollIntoView = () => {
    const element = document.getElementById('state-legislators')
    element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <MobileOnly>
        <Box m={1} mt={7} display="flex" justifyContent="center">
          <Typography variant="h4" component="h2" gutterBottom>
            PSP {stateName}
          </Typography>
        </Box>
      </MobileOnly>
      <DesktopOnly>
        <Box m={1} mt={8} mb={1} display="flex" justifyContent="left">
          <Typography variant="h5" component="h2" color="inherit" gutterBottom>
            PSP {stateName}
          </Typography>
        </Box>
      </DesktopOnly>

      <Box mx={1} my={1}>
        <Divider />
      </Box>
      <P>
        Every day we pray for three {stateName}{' '}
        <Link onClick={scrollIntoView} component="button" variant="body1">
          legislators
        </Link>{' '}
        on both the state and federal level.
      </P>

      <P>To help facilitate this movement, we send a post out each morning.</P>

      <DesktopOnly>
        <Button onClick={() => setTabIndex(1)}>mailing list</Button>
        <Button onClick={() => setTabIndex(2)}>Facebook</Button>
        <Button onClick={() => setTabIndex(3)}>Twitter</Button>
      </DesktopOnly>

      <P>
        If {stateName} is not your state, first{' '}
        <Link variant="inherit" component={RouterLink} to="/find-your-state">
          find your state
        </Link>{' '}
        and then follow on Twitter or Facebook, or get on the mailing list.
      </P>

      <P>
        You can join thousands in every state who are praying for their specific state leaders each
        day.
      </P>
    </>
  )
}

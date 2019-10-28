import React from 'react'
import Box from '@material-ui/core/Box'
import { Redirect, useRouteMatch } from 'react-router'
import DailyLeaders from '../DailyLeaders'
import StateLeaders from '../State/StateLeaders'
import useHomePath from '../utilities/useHomePath'
import MobileOnly from '../MobileOnly'

export default () => {
  const match = useRouteMatch()
  const homePath = useHomePath()

  if (match.path === '/') {
    return <Redirect to={homePath} />
  }

  return (
    <Box>
      <MobileOnly>
        <Box py={0}>
          <DailyLeaders />
        </Box>
      </MobileOnly>

      <Box>
        <StateLeaders />
      </Box>
    </Box>
  )
}

import React from 'react'
import Box from '@material-ui/core/Box'
import { Redirect, useRouteMatch } from 'react-router'

import DailyLeaders from '../DailyLeaders'
import StateLeaders from '../StateLeaders'
import { useStateCode, useHomePath } from '../utilities/states'

const Home = () => {
  const stateCode = useStateCode()
  const match = useRouteMatch()
  const homePath = useHomePath()
  if (!stateCode) return null

  if (match.path !== '/states/:stateCode') {
    return <Redirect to={homePath} />
  }

  return (
    <Box>
      <Box bgcolor="primary.light" py={1}>
        <DailyLeaders />
      </Box>
      <Box>
        <StateLeaders />
      </Box>
    </Box>
  )
}

export default Home

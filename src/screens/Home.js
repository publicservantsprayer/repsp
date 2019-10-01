import React from 'react'
import Box from '@material-ui/core/Box'
import { Redirect, useRouteMatch } from 'react-router'

import DailyLeaders from '../DailyLeaders'
import { useStateCode } from '../utilities/states'

const Home = () => {
  const stateCode = useStateCode()
  const match = useRouteMatch()
  if (!stateCode) return null

  if (match.path !== '/states/:stateCode') {
    return <Redirect to={`/states/${stateCode.toLowerCase()}`} />
  }

  return (
    <Box bgcolor="primary.light" py={1}>
      <DailyLeaders />
    </Box>
  )
}

export default Home

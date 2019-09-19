import React from 'react'
import Box from '@material-ui/core/Box'

import DailyLeaders from '../DailyLeaders'

const Home = () => {
  return (
    <Box bgcolor="primary.light" py={1}>
      <DailyLeaders />
    </Box>
  )
}

export default Home

import React from 'react'
import Box from '@material-ui/core/Box'
import { Redirect, useRouteMatch } from 'react-router'

import DailyLeaders from '../DailyLeaders'
import StateLeaders from '../StateLeaders'
import useHomePath from '../utilities/useHomePath'
import MobileOnly from '../MobileOnly'
import Layout from '../Layout'

export default function Home() {
  const match = useRouteMatch()
  const homePath = useHomePath()

  if (match.path === '/') {
    return <Redirect to={homePath} />
  }

  return (
    <Layout>
      <MobileOnly>
        <Box py={0}>
          <DailyLeaders />
        </Box>
      </MobileOnly>

      <Box>
        <StateLeaders />
      </Box>
    </Layout>
  )
}

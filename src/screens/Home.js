import React from 'react'
import Box from '@material-ui/core/Box'
import { Redirect, useRouteMatch, useParams } from 'react-router'

import DailyLeaders from '../DailyLeaders'
import StateLeaders from '../State/StateLeaders'
import { useStateCode, useHomePath } from '../utilities/states'
import { useHistoricalPost, useLatestPost } from '../firebase'

const HistoricalDailyLeaders = () => {
  const { year, month, day } = useParams()
  const [post] = useHistoricalPost(year, month, day)

  return post ? <DailyLeaders post={post} /> : null
}

const LatestDailyLeaders = () => {
  const [post] = useLatestPost()

  return post ? <DailyLeaders post={post} /> : null
}

export default () => {
  const stateCode = useStateCode()
  const match = useRouteMatch()
  const homePath = useHomePath()
  const { year, month, day } = useParams()

  if (!stateCode) return null

  const ShowDailyLeaders = year && month && day ? HistoricalDailyLeaders : LatestDailyLeaders

  if (match.path === '/') {
    return <Redirect to={homePath} />
  }

  return (
    <Box>
      <Box bgcolor="primary.light" py={1}>
        <ShowDailyLeaders />
      </Box>
      <Box>
        <StateLeaders />
      </Box>
    </Box>
  )
}

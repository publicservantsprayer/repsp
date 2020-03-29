import React from 'react'
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'

import useUSAState from '../utilities/useUSAState'
import { useHistoricalPost, useLatestPost } from '../utilities/firebase'
import MobileOnly from '../MobileOnly'
import DesktopOnly from '../DesktopOnly'
import Tabs from './Tabs'
import TabPanels from './TabPanels'
import StateMessage from './StateMessage'

const ActualDailyLeaders = ({ post, loading }) => {
  const [tabIndex, setTabIndex] = React.useState(0)

  const onChange = (event, newIndex) => setTabIndex(newIndex)

  return (
    <Box bgcolor="common.black" maxWidth="900px" width="100%" borderRadius="borderRadius" mb={6}>
      <MobileOnly>
        <Tabs tabIndex={tabIndex} onChange={onChange} fullWidth />

        <TabPanels tabIndex={tabIndex} post={post} />

        <Box p={1} bgcolor="background.default" color="text.secondary">
          <StateMessage setTabIndex={setTabIndex} />
        </Box>
      </MobileOnly>

      <DesktopOnly>
        <Tabs tabIndex={tabIndex} onChange={onChange} centered />

        <Box display="flex">
          <Box p={2} mx={2} borderRadius="borderRadius" flexGrow={1}>
            <TabPanels tabIndex={tabIndex} post={post} />
          </Box>

          <Box width="38%" p={2} bgcolor="background.default" color="text.secondary">
            <StateMessage setTabIndex={setTabIndex} />
          </Box>
        </Box>
      </DesktopOnly>
    </Box>
  )
}

const fakePost = {
  leader1: {},
  leader2: {},
  leader3: {},
}

const HistoricalDailyLeaders = () => {
  const { year, month, day } = useParams()
  let [post, loading] = useHistoricalPost(year, month, day)
  post = loading ? fakePost : post

  return <ActualDailyLeaders post={post} />
}

const LatestDailyLeaders = () => {
  let [post, loading] = useLatestPost()
  post = loading ? fakePost : post

  return <ActualDailyLeaders post={post} />
}

export default function DailyLeaders() {
  const { stateCode } = useUSAState()
  const { year, month, day } = useParams()

  if (!stateCode) return null

  if (year && month && day) {
    return <HistoricalDailyLeaders />
  } else {
    return <LatestDailyLeaders />
  }
}

import React from 'react'
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'

import useUSAState from '../utilities/useUSAState'
import { useHistoricalPost, useLatestPost } from '../firebase'
import MobileOnly from '../MobileOnly'
import DesktopOnly from '../DesktopOnly'
import Tabs from './Tabs'
import TabPanels from './TabPanels'
import StateMessage from './StateMessage'

const ActualDailyLeaders = ({ post }) => {
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

const HistoricalDailyLeaders = () => {
  const { year, month, day } = useParams()
  const [post] = useHistoricalPost(year, month, day)

  return post ? <ActualDailyLeaders post={post} /> : null
}

const LatestDailyLeaders = () => {
  const [post] = useLatestPost()

  return post ? <ActualDailyLeaders post={post} /> : null
}

export default function DailyLeadersx() {
  const { stateCode } = useUSAState()
  const { year, month, day } = useParams()

  if (!stateCode) return null

  if (year && month && day) {
    return <HistoricalDailyLeaders />
  } else {
    return <LatestDailyLeaders />
  }
}

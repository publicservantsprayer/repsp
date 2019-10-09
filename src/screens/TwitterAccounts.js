import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { H1 } from '../utilities/formating'
import { statesObj, stateCodes } from '../utilities/states'
import TwitterTimeline from '../TwitterTimeline'

const TwitterAccount = ({ stateCode }) => {
  const [showTimeline, setShowTimeline] = React.useState()

  const twitterAccount = `Praying4_${stateCode}`

  return (
    <Box m={1}>
      <Paper>
        <Box padding={1} display="flex" width="100%">
          <Box p={1}>
            {twitterAccount}
          </Box>
          <Box p={0}>
            <Button variant="outlined" onClick={() => setShowTimeline(!showTimeline)}>Timeline</Button>
          </Box>
          <Box p={1}>
            {statesObj[stateCode]}
          </Box>
        </Box>
        {showTimeline && <TwitterTimeline stateCode={stateCode} />}
      </Paper>
    </Box>
  )
}

export default () => {
  return (
    <Box m={1}>
      <H1>Twitter Accounts</H1>
      {stateCodes.map(stateCode => {
        return <TwitterAccount stateCode={stateCode} />
      })}
    </Box>
  )
}

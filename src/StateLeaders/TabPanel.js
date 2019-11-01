import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { H4 } from '../utilities/formating'
import useUSAState from '../utilities/useUSAState'
import Leaders from './Leaders'

export default function TabPanel({ chamber, currentTab, index }) {
  const { stateName } = useUSAState()
  const chamberTitle = chamber === 'H' ? 'Representatives' : 'Senators'

  return (
    <Box display="flex" justifyContent="center">
      <Typography component="div" role="tabpanel" hidden={currentTab !== index}>
        <Box px={2} pt={5}>
          <H4>
            US {chamberTitle} from {stateName}
          </H4>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="left">
          <Leaders legType="FL" chamber={chamber} />
        </Box>

        <Box px={2} pt={5}>
          <H4>
            {stateName} State {chamberTitle}
          </H4>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="left">
          <Leaders legType="SL" chamber={chamber} />
        </Box>
      </Typography>
    </Box>
  )
}

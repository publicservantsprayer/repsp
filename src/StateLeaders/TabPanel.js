import React from 'react'
import Box from '@material-ui/core/Box'
import { H4 } from '../utilities/formating'
import useUSAState from '../utilities/useUSAState'
import Leaders from './Leaders'
import useMobile from '../utilities/useMobile'
import { Divider } from '@material-ui/core'

export default function TabPanel({ chamber, currentTab, index }) {
  const { stateName } = useUSAState()
  const chamberTitle = chamber === 'H' ? 'Representatives' : 'Senators'
  const mobile = useMobile()
  const align = mobile ? 'center' : 'left'

  return (
    <Box role="tabpanel" hidden={currentTab !== index}>
      <Box px={2} pt={5} textAlign={align}>
        <H4>
          US {chamberTitle} from {stateName}
        </H4>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent={align} mb={3}>
        <Leaders legType="FL" chamber={chamber} />
      </Box>
      <Divider />
      <Box px={2} pt={5} textAlign={align}>
        <H4>
          {stateName} State {chamberTitle}
        </H4>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent={align}>
        <Leaders legType="SL" chamber={chamber} />
      </Box>
    </Box>
  )
}

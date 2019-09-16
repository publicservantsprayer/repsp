import React from 'react'
import Box from '@material-ui/core/Box'

import { stateName } from './utilities/states'

const StateFlag = ({ stateCode }) => {
  return (
    <Box>
      <p>
        <img
          src={`/images/flags/${stateName(stateCode)}.svg`}
          width="150"
          alt="whatevs"
        />
      </p>
    </Box>
  )
}

export default StateFlag

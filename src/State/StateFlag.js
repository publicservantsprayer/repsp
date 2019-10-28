import React from 'react'
import Box from '@material-ui/core/Box'
import useUSAState from '../utilities/useUSAState'

const StateFlag = () => {
  const { stateName } = useUSAState()

  return (
    <Box>
      <p>
        <img
          src={`/images/flags/${stateName}.svg`}
          width="150"
          alt="whatevs"
        />
      </p>
    </Box>
  )
}

export default StateFlag

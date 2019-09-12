import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'

const StateCapital = ({ stateCode }) => {
  return (
    <Box>
      <p>
        <img
          src={`/images/capitols/${stateCode.toLowerCase()}-400.png`}
          width="150"
          alt="whatevs"
        />
      </p>
    </Box>
  )
}

export default StateCapital

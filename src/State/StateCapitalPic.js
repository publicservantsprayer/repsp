import React from 'react'
import Box from '@material-ui/core/Box'

const StateCapitalPic = ({ stateCode }) => {
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

export default StateCapitalPic

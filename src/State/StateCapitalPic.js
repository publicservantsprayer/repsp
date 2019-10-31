import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import useUSAState from '../utilities/useUSAState'

const StateCapitalPic = () => {
  const { lowerCaseStateCode } = useUSAState()
  const url = `/images/capitols/${lowerCaseStateCode}-400.png`

  const useStyles = makeStyles(theme => ({
    root: {
      background: `url("${url}") top center no-repeat`,
      backgroundPositionY: '-0px',
      height: '300px',
    },
  }))
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      {/* <div style={{ height: '100px', overflow: 'hidden' }}>
        <img
          src={url}
          width="150"
          alt="whatevs"
          className={classes.borderRadius}
        />
      </div> */}
    </Box>
  )
}

export default StateCapitalPic

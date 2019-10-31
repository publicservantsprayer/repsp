import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import wiki from 'wikijs'

import useUSAState from '../utilities/useUSAState'

const StateBlurb = ({ stateCode }) => {
  const [blurb, setBlurb] = useState()
  const { stateName } = useUSAState()

  useEffect(() => {
    wiki()
      .page(stateName)
      .then(page => page.summary())
      .then(summary => {
        setBlurb(summary)
      })
  })

  return (
    <Box>
      <p>{blurb}</p>
    </Box>
  )
}

export default StateBlurb

import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'

import wiki from 'wikijs'
import { stateName } from '../utilities/states'

const StateBlurb = ({ stateCode }) => {
  const [blurb, setBlurb] = useState()
  useEffect(() => {
    wiki()
      .page(stateName(stateCode))
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

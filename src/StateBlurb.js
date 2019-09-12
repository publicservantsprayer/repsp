import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'

import wiki from 'wikijs'
import { statesObj } from './utilities/states'

const StateBlurb = () => {
  const [blurb, setBlurb] = useState()
  useEffect(() => {
    wiki()
      .page(statesObj['IN'])
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

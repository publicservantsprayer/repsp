import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import useDesktop from '../utilities/useDesktop'

export default function Title({ children, centered }) {
  const desktop = useDesktop()
  const variant = desktop ? 'h2' : 'h4'

  const justify = centered ? 'center' : 'left'

  return (
    <Box display="flex" justifyContent={justify}>
      <Box>
        <Typography variant={variant} component="h1">
          {children}
        </Typography>
      </Box>
    </Box>
  )
}

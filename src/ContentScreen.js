import React from 'react'
import Box from '@material-ui/core/Box'

export default ({ children }) => {
  return (
    <Box mx={2} my={2}>
      {children}
    </Box>
  )
}

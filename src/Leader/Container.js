import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '../Container'

export default ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box bgcolor="common.black">
        {children}
      </Box>
    </Container>
  )
}

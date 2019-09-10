import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export const H1 = ({ children }) =>
  <Box p={2} mt={3}>
    <Typography variant="h1" component="h1">{children}</Typography>
  </Box>

export const H2 = ({ children }) =>
  <Box p={2}>
    <Typography variant="h4" component="h2">{children}</Typography>
  </Box>

export const P = ({ children }) =>
  <Box p={2}>
    <Typography variant="body1" component="p">{children}</Typography>
  </Box>

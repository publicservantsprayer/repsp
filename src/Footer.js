import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

export default () => {
  return (
    <Box p={8} mt={18} bgcolor="common.black">
      <Box display="flex" justifyContent="space-around">
        <Box p={2} mx={3}>
          <Link color="inherit" component={RouterLink} to="/about">
            About
          </Link>
        </Box>
        <Box p={2} mx={3}>
          <Link color="inherit" component={RouterLink} to="/privacy-policy">
            Privacy Policy
          </Link>
        </Box>
        <Box p={2} mx={3}></Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box p={3}>© 2019 Public Servants' Prayer.</Box>
      </Box>
    </Box>
  )
}

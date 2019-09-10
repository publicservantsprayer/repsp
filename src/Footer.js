import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Box p={8} mt={18} bgcolor="common.black">
      <Box display="flex" justifyContent="center">
        <Box p={2} mx={3}>
          <Link color="inherit" component={RouterLink} to="/">About</Link>
        </Box>
        <Box p={2} mx={3} >
          <Link color="inherit" component={RouterLink} to="/">Privacy Policy</Link>
        </Box>
        <Box p={2} mx={3} >
          <Link color="inherit" component={RouterLink} to="/">Terms</Link>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box p={3
        } >© 2019 Public Servants' Prayer.</Box>
      </Box>
    </Box>
  )
}

export default Footer

import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

export default () => {
  return (
    <Box p={3} pt={8} bgcolor="common.black">
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-around">
          <Box p={2}>
            <Link color="inherit" component={RouterLink} to="/about">
              About
            </Link>
          </Box>
          <Box p={2}>
            <Link color="inherit" component={RouterLink} to="/privacy-policy">
              <Typography variant="body2" noWrap>
                Privacy Policy
              </Typography>
            </Link>
          </Box>
          <Box p={2}>
            <Link color="inherit" component={RouterLink} to="/our-partners">
              <Typography variant="body2" noWrap>
                Partners
              </Typography>
            </Link>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Box p={3}>© 2019 Public Servants' Prayer.</Box>
        </Box>
      </Container>
    </Box>
  )
}

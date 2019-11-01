import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

export default function Footer() {
  return (
    <Box p={3} pt={8} bgcolor="common.black">
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-around">
          <Box p={2}>
            <Link color="inherit" component={RouterLink} to="/about" underline="hover">
              About
            </Link>
          </Box>
          <Box p={2}>
            <Link color="inherit" component={RouterLink} to="/privacy-policy" underline="hover">
              <Typography variant="body2" noWrap>
                Privacy Policy
              </Typography>
            </Link>
          </Box>
          <Box p={2}>
            <Link color="inherit" component={RouterLink} to="/our-partners" underline="hover">
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

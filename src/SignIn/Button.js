import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export default ({ text, onClick }) =>
  <Box my={2} textAlign="center">
    <Button variant="contained" size="large" onClick={onClick} fullWidth>{text}</Button>
  </Box>

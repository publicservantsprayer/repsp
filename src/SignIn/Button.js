import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export default ({ text, onClick, disabled }) =>
  <Box my={2} textAlign="center">
    <Button variant="contained" size="large" onClick={onClick} disabled={disabled} fullWidth>{text}</Button>
  </Box>

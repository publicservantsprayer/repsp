import React from 'react'
import Box from '@material-ui/core/Box'
import MuiButton from '@material-ui/core/Button'

export default function Button({ text, onClick, disabled }) {
  return (
    <Box my={2} textAlign="center">
      <MuiButton variant="contained" size="large" onClick={onClick} disabled={disabled} fullWidth>
        {text}
      </MuiButton>
    </Box>
  )
}

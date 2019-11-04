import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export default function SignInButton({ text, onClick, disabled }) {
  return (
    <Box my={2} textAlign="center">
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={onClick}
        disabled={disabled}
        fullWidth>
        {text}
      </Button>
    </Box>
  )
}

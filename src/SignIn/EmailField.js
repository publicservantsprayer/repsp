import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function EmailField({ onChange, disabled }) {
  return (
    <TextField
      id="outlined-email-input"
      label="Email"
      type="email"
      name="email"
      autoComplete="email"
      margin="normal"
      variant="filled"
      onChange={onChange}
      disabled={disabled}
      fullWidth
    />
  )
}

import React from 'react'

import TextField from '@material-ui/core/TextField'

export default ({ onChange, disabled }) =>
  <TextField
    id="outlined-email-input"
    label="Email"
    type="email"
    name="email"
    autoComplete="email"
    margin="normal"
    variant="outlined"
    onChange={onChange}
    disabled={disabled}
    fullWidth
  />

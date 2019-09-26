import React from 'react'

import TextField from '@material-ui/core/TextField'

export default ({ field, values, handleChange, ...rest }) => (
  <TextField
    id={field}
    onChange={handleChange(field)}
    value={values[field]}
    margin="normal"
    variant="outlined"
    fullWidth
    InputLabelProps={{ disableAnimation: false }}
    {...rest}
  />
)

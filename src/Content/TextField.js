import React from 'react'
import MuiTextField from '@material-ui/core/TextField'

export default function TextField({ field, values, handleChange, ...rest }) {
  return (
    <MuiTextField
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
}

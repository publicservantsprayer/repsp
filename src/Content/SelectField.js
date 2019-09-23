import React from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export default ({ field, label, values, handleChange, children }) => {
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  if (!values.category) values.category = ''

  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      <InputLabel ref={inputLabel} htmlFor={field}>
        {label}
      </InputLabel>

      <Select
        variant="outlined"
        value={values.category}
        onChange={handleChange(field)}
        labelWidth={labelWidth}
        inputProps={{ name: field, id: field }}>
        {children}
      </Select>
    </FormControl>
  )
}

import React from 'react'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { KeyboardDatePicker } from '@material-ui/pickers'

export default function DatePicker({ value, onChange }) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        inputVariant="outlined"
        margin="normal"
        id="date-picker-dialog"
        label="Created on"
        format="MM/dd/yyyy"
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

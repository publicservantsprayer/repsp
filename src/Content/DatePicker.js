import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { KeyboardDatePicker } from '@material-ui/pickers'

export default ({ selectedDate, onChange }) =>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      inputVariant="outlined"
      margin="normal"
      id="date-picker-dialog"
      label="Created on"
      format="MM/dd/yyyy"
      value={selectedDate}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  </MuiPickersUtilsProvider>

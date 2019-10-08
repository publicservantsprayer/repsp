import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { KeyboardDatePicker } from '@material-ui/pickers'

export default ({ selectedDate, handleDateChange }) =>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      inputVariant="outlined"
      margin="normal"
      id="date-picker-dialog"
      label="Created on"
      format="MM/dd/yyyy"
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  </MuiPickersUtilsProvider>

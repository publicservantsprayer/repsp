import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import useUSAState from '../utilities/useUSAState'

import { useFirebase } from '../utilities/firebase'

const DailyEmailState = ({ profile }) => {
  const inputLabel = React.useRef(null)
  const [stateCode, setStateCode] = React.useState(profile.dailyEmailStateCode)
  const { statesObj } = useUSAState()
  const { db } = useFirebase()
  const states = Object.keys(statesObj).map((stateCode) => [stateCode, statesObj[stateCode]])

  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleChange = (event) => {
    setStateCode(event.target.value)
    db.collection('userProfiles').doc(profile.user.uid).update({
      dailyEmailStateCode: event.target.value,
    })
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel ref={inputLabel}>Daily email state</InputLabel>
      <Select value={stateCode} onChange={handleChange} labelWidth={labelWidth}>
        {states.map((state) => (
          <MenuItem key={state[0]} value={state[0]}>
            {state[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DailyEmailState

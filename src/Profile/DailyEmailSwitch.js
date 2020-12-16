import React from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useFirebase } from '../utilities/firebase'

function DailyEmailSwitch({ profile }) {
  const [state, setState] = React.useState(profile.sendDailyEmail)
  const { db } = useFirebase()
  const handleChange = (event) => {
    setState(!state)
    db.collection('userProfiles').doc(profile.user.uid).update({
      sendDailyEmail: !state,
    })
  }
  return (
    <FormControlLabel
      control={<Switch checked={state} onChange={handleChange} value="checkedB" color="primary" />}
      label="Send me a daily email"
    />
  )
}

export default DailyEmailSwitch

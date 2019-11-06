import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import { Divider } from '@material-ui/core'
import { Redirect } from 'react-router'
import Gravatar from 'react-gravatar'

import Layout from '../Layout'
import { useUser, useUserProfile, useFirebase } from '../utilities/firebase'
import Content from '../Layout/Content'
import LayoutTitle from '../Layout/Title'
import useUSAState from '../utilities/useUSAState'
import { H5 } from '../utilities/formating'
import useMobile from '../utilities/useMobile'

const DailyEmailState = ({ profile }) => {
  const inputLabel = React.useRef(null)
  const [stateCode, setStateCode] = React.useState(profile.dailyEmailStateCode)
  const { statesObj } = useUSAState()
  const { db } = useFirebase()
  const states = Object.keys(statesObj).map(stateCode => [stateCode, statesObj[stateCode]])

  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleChange = event => {
    setStateCode(event.target.value)
    db.collection('userProfiles')
      .doc(profile.user.uid)
      .update({
        dailyEmailStateCode: event.target.value,
      })
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel ref={inputLabel}>Daily email state</InputLabel>
      <Select value={stateCode} onChange={handleChange} labelWidth={labelWidth}>
        {states.map(state => (
          <MenuItem key={state[0]} value={state[0]}>
            {state[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const DailyEmailSwitch = ({ profile }) => {
  const [state, setState] = React.useState(profile.sendDailyEmail)
  const { db } = useFirebase()

  const handleChange = event => {
    setState(!state)
    db.collection('userProfiles')
      .doc(profile.user.uid)
      .update({
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

const ProfileBody = () => {
  const { stateCode } = useUSAState()
  const [user, loadingUser] = useUser()
  const [profile, loadingProfile] = useUserProfile()
  const { db } = useFirebase()
  const mobile = useMobile()

  React.useEffect(() => {
    if (profile && !profile.dailyEmailStateCode) {
      db.collection('userProfiles')
        .doc(user.uid)
        .update({ dailyEmailStateCode: stateCode })
    }
  }, [db, profile, stateCode, user])

  if (loadingUser || loadingProfile) return null

  if (!user && !profile) {
    return <Redirect to="/sign-in" />
  }

  return (
    <>
      <Box display="flex" flexWrap="wrap" mx={4} mt={4}>
        {mobile && <Gravatar email={profile.email} protocal="https" default="mp" />}
        <Box flexGrow={1} pt={2}>
          <H5>{profile.email}</H5>
        </Box>
        {!mobile && <Gravatar email={profile.email} protocal="https" default="mp" />}
      </Box>

      <Box mx={4} my={2}>
        <Divider />
      </Box>

      <Box m={4}>
        <DailyEmailSwitch profile={profile} />
      </Box>

      <Box m={4} maxWidth={400}>
        <DailyEmailState profile={profile} />
      </Box>
    </>
  )
}

export default function Profile() {
  return (
    <Layout>
      <Content>
        <LayoutTitle>Profile</LayoutTitle>
        <Box p={2} my={1} clone>
          <Paper>
            <ProfileBody />
          </Paper>
        </Box>
      </Content>
    </Layout>
  )
}

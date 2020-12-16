import React from 'react'
import Box from '@material-ui/core/Box'
import { Divider } from '@material-ui/core'
import { Redirect } from 'react-router'
import Gravatar from 'react-gravatar'

import { useAdmin, useUser, useUserProfile, useFirebase } from '../utilities/firebase'
import useUSAState from '../utilities/useUSAState'
import { H4, H5 } from '../utilities/formating'
import useMobile from '../utilities/useMobile'
import GoogleProfile from './GoogleProfile'
import DailyEmailState from './DailyEmailState'
import DailyEmailSwitch from './DailyEmailSwitch'

function ProfileBody() {
  const { stateCode } = useUSAState()
  const [admin] = useAdmin()
  const [user, loadingUser] = useUser()
  const [profile, loadingProfile] = useUserProfile()
  const { db } = useFirebase()
  const mobile = useMobile()

  React.useEffect(() => {
    if (profile && !profile.dailyEmailStateCode) {
      db.collection('userProfiles').doc(user.uid).update({ dailyEmailStateCode: stateCode })
    }
  }, [db, profile, stateCode, user])

  if (loadingUser || loadingProfile) return null

  if (!user && !profile) {
    return <Redirect to="/sign-in" />
  }

  return (
    <>
      {admin && <H4>Admin</H4>}
      {admin && <GoogleProfile />}
      <Box display="flex" flexWrap="wrap" mx={4} mt={4}>
        {mobile && <Gravatar email={profile.email} default="mp" />}
        <Box flexGrow={1} pt={2}>
          <H5>{profile.email}</H5>
        </Box>
        {!mobile && <Gravatar email={profile.email} default="mp" />}
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

export default ProfileBody

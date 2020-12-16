import React from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useUser, useUserProfile, useFirebase } from '../utilities/firebase'

function ConnectButton() {
  const { firebase, db } = useFirebase()
  const [user] = useUser()

  const handleGoogleAuth = async () => {
    if (!user) return

    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    try {
      const result = await firebase.auth().signInWithPopup(provider)
      var token = result.credential.accessToken
      console.log('Google API Access Token: ', token)
      console.log('Google result: ', result)
      try {
        await db
          .collection('userSecrets')
          .doc(user.uid)
          .set({ googleApiToken: token, googleUserInfo: { ...result.additionalUserInfo } })
        console.log('API Token saved')
      } catch (error) {
        console.log('error saving google api key', error)
      }
    } catch (error) {
      console.log(error.code, error.message, error.email, error.credential)
    }
  }
  return (
    <Button variant="contained" size="large" onClick={handleGoogleAuth}>
      Connect your Google account
    </Button>
  )
}

const GoogleProfile = () => {
  const [signedInWithGoogle, setSignedInWithGoogle] = React.useState()
  const [googleProfile, setGoogleProfile] = React.useState()
  const [user, loadingUser] = useUser()
  const [profile, loadingProfile] = useUserProfile()

  React.useEffect(() => {
    if (user) {
      user.providerData.forEach((profile) => {
        console.log('Sign-in provider: ' + profile.providerId)
        console.log('  Provider-specific UID: ' + profile.uid)
        console.log('  Name: ' + profile.displayName)
        console.log('  Email: ' + profile.email)
        console.log('  Photo URL: ' + profile.photoURL)

        if (profile.providerId === 'google.com') {
          console.log(profile)
          setSignedInWithGoogle(true)
          setGoogleProfile(profile)
        }
      })
    }
  }, [user])

  if (!signedInWithGoogle) return <ConnectButton />
  if (signedInWithGoogle) return <ConnectButton />

  return (
    <Box>
      Connected to your Google account:
      <Box>
        <img
          style={{ maxWidth: '100px' }}
          src={googleProfile.photoURL}
          alt={googleProfile.displayName}
        />
        {googleProfile.displayName} - {googleProfile.email}
      </Box>
    </Box>
  )
}

export default GoogleProfile

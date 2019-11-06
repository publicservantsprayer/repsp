import React from 'react'
import { Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import { H1, P } from '../utilities/formating'
import { useFirebase } from '../utilities/firebase'
import SlideInMessage from '../SlideInMessage'
import EmailField from './EmailField'
import Button from './Button'

export default function EmailLinkLanding() {
  const { auth } = useFirebase()
  const [emailConfirmation, setEmailConfirmation] = React.useState()
  const [incorrectEmailOpen, setIncorrectEmailOpen] = React.useState()
  const [redirectTo, setRedirectTo] = React.useState()
  const [confirmEmail, setConfirmEmail] = React.useState()
  const [errorOpen, setErrorOpen] = React.useState()

  const handleIncorrectEmailClose = () => {
    setIncorrectEmailOpen(false)
    setConfirmEmail(true)
  }

  const handleErrorClose = () => {
    setErrorOpen(false)
    setRedirectTo('/sign-in')
  }

  const handleSendEmailConfirmation = () => {
    setConfirmEmail(false)
    sendEmailConfirmation(emailConfirmation)
  }

  const handleEmailConfirmationChange = event => setEmailConfirmation(event.target.value)

  const sendEmailConfirmation = React.useCallback(
    async email => {
      try {
        await auth.signInWithEmailLink(email, window.location.href)
        window.localStorage.removeItem('emailForSignIn')
        setRedirectTo('/profile')
      } catch (error) {
        if (error.code === 'auth/invalid-email') {
          setIncorrectEmailOpen(true)
        } else {
          setErrorOpen(true)
        }
        console.log('Error signing in', error)
      }
    },
    [auth]
  )

  React.useEffect(() => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      const emailLocalStorage = window.localStorage.getItem('emailForSignIn')
      if (emailLocalStorage) {
        sendEmailConfirmation(emailLocalStorage)
      } else {
        setConfirmEmail(true)
      }
    } else {
      console.log('Not a valid signInWithEmailLink')
    }
  }, [auth, sendEmailConfirmation])

  if (redirectTo) return <Redirect to={redirectTo} />

  return (
    <Container>
      <Box mx={2}>
        {!confirmEmail && <H1>Signing you in...</H1>}
        {confirmEmail && (
          <>
            <H1>Continue Signing In</H1>
            <P>
              Since you are signing in on a different device, please provide your email for
              confirmation.
            </P>
            <EmailField onChange={handleEmailConfirmationChange} />
            <Button onClick={handleSendEmailConfirmation} text="Verify Email" />
          </>
        )}
      </Box>

      <SlideInMessage
        handleClose={handleIncorrectEmailClose}
        open={incorrectEmailOpen}
        title="Incorrect Email">
        The email address was incorrect. Please try again.
      </SlideInMessage>

      <SlideInMessage handleClose={handleErrorClose} open={errorOpen} title="Error Signing In">
        There was an error signing you in. This can happen if the link is expired, or has already
        been used.
      </SlideInMessage>
    </Container>
  )
}

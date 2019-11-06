import React from 'react'
import Box from '@material-ui/core/Box'

import EmailSignIn from './EmailSignIn'
import { P } from '../utilities/formating'

export default function SignIn() {
  const buttonText = 'Send me an email link'
  const sentMessage =
    'A message with a sign in link has been sent.  Check your email and sign in with that link now.'
  const errorMessage = 'There was an error sending you an email.  Please try again.'

  return (
    <>
      <Box p={1}>
        <P>
          Sign in by entering your email address. We will send you an email with a link allowing you
          to sign in without a password.
        </P>
      </Box>
      <EmailSignIn sentMessage={sentMessage} errorMessage={errorMessage} buttonText={buttonText} />
    </>
  )
}

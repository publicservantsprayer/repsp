import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

import { H1, P } from '../utilities/formating'
import Content from '../Layout/Content'
import EmailSignIn from './EmailSignIn'

export default function SignIn() {
  const buttonText = 'Send me an email link'
  const sentMessage =
    'A message with a sign in link has been sent.  Check your email and sign in with that link now.'
  const errorMessage = 'There was an error sending you an email.  Please try again.'

  return (
    <Content>
      <Container maxWidth="sm">
        <Box mx={2}>
          <H1>Sign In</H1>
          <Box p={1}>
            <Divider />
            <Box pt={3} pb={1}>
              <P>
                Sign in by entering your email address. We will send you an email with a link
                allowing you to sign in without a password.
              </P>
            </Box>
            <EmailSignIn
              sentMessage={sentMessage}
              errorMessage={errorMessage}
              buttonText={buttonText}
            />
          </Box>
        </Box>
      </Container>
    </Content>
  )
}

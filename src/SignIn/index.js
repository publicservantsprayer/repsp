import React from 'react'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { H1 } from '../utilities/formating'
import Content from '../Screen/Content'
import EmailSignIn from './EmailSignIn'

export default () => {
  const buttonText = "Send me an email link"
  const sentMessage = "A message with a sign in link has been sent.  Check your email and sign in with that link now."
  const errorMessage = "There was an error sending you an email.  Please try again."

  return (
    <Content>
      <Container maxWidth="sm">
        <Box mx={2}>
          <H1>Sign In</H1>
          <EmailSignIn sentMessage={sentMessage} errorMessage={errorMessage} buttonText={buttonText} />
        </Box>
      </Container >
    </Content>
  )
}

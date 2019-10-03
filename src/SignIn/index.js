import React from 'react'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { H1 } from '../utilities/formating'
import { useFirebase } from '../firebase'
import SlideInMessage from '../SlideInMessage'
import EmailField from './EmailField'
import Button from './Button'

export default () => {
  const { auth } = useFirebase()
  const [email, setEmail] = React.useState()
  const [messageSentOpen, setMessageSentOpen] = React.useState()
  const [messageEmailErrorOpen, setMessageEmailErrorOpen] = React.useState()
  const [disabled, setDisabled] = React.useState()

  const handleMessageSentClose = () => setMessageSentOpen(false)
  const handleMessageEmailErrorClose = () => setMessageEmailErrorOpen(false)

  const handleEmailChange = event => setEmail(event.target.value)

  const handleSendLink = async () => {
    const actionCodeSettings = {
      url: `${window.location.origin}/sign-in/email-link-landing`,
      handleCodeInApp: true,
    }
    try {
      await auth.sendSignInLinkToEmail(email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', email)
      setDisabled(true)
      setMessageSentOpen(true)
    } catch (error) {
      setDisabled(false)
      setMessageEmailErrorOpen(true)
      console.log('Error sending email: ', error)
    }
  }

  return (
    <Container>
      <Box mx={2}>
        <H1>Sign In</H1>
        <EmailField onChange={handleEmailChange} disabled={disabled} />
        <Button onClick={handleSendLink} text="Send me an email link" disabled={disabled} />
      </Box>

      <SlideInMessage handleClose={handleMessageSentClose} open={messageSentOpen} title="Email Sent">
        A message with a sign in link has been sent to {email}.  Check your email and sign in with that link now.
      </SlideInMessage>

      <SlideInMessage handleClose={handleMessageEmailErrorClose} open={messageEmailErrorOpen} title="Error sending email">
        There was an error sending you an email.  Please try again.
      </SlideInMessage>
    </Container >
  )
}

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
  const [messageSentOpen, setMessageSentOpen] = React.useState(false)

  const handleMessageSentClose = () => setMessageSentOpen(false)

  const handleEmailChange = event => setEmail(event.target.value)



  const handleSendLink = async () => {
    const actionCodeSettings = {
      url: `${window.location.origin}/sign-in/email-link-landing`,
      handleCodeInApp: true,
    }
    console.log(actionCodeSettings)
    try {
      await auth.sendSignInLinkToEmail(email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', email)
      setMessageSentOpen(true)
    } catch (error) {
      console.log('Error sending email: ', error)
    }
  }

  return (
    <Container>
      <Box mx={2}>
        <H1>Sign In</H1>
        <EmailField onChange={handleEmailChange} />
        <Button onClick={handleSendLink} text="Send me an email link" />
      </Box>

      <SlideInMessage handleClose={handleMessageSentClose} open={messageSentOpen} title="Email Sent">
        A message with a sign in link has been sent to {email}.  Check your email and sign in with that link now.
      </SlideInMessage>
    </Container >
  )
}

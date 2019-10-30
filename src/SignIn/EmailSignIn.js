import React from 'react'
import { useFirebase } from '../firebase'
import SlideInMessage from '../SlideInMessage'
import EmailField from './EmailField'
import Button from './Button'
import Box from '@material-ui/core/Box'

export default ({ buttonText, sentMessage, errorMessage }) => {
  const { auth } = useFirebase()
  const [email, setEmail] = React.useState()
  const [messageSentOpen, setMessageSentOpen] = React.useState(false)
  const [messageEmailErrorOpen, setMessageEmailErrorOpen] = React.useState(false)
  const [disabled, setDisabled] = React.useState()
  const handleMessageSentClose = () => setMessageSentOpen(false)
  const handleMessageEmailErrorClose = () => setMessageEmailErrorOpen(false)
  const handleEmailChange = event => setEmail(event.target.value)
  const handleSendLink = async () => {
    const actionCodeSettings = {
      url: `${window.location.origin}/sign-in/email-link-landing`,
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', email)
      setDisabled(true)
      setMessageSentOpen(true)
    }
    catch (error) {
      setDisabled(false)
      setMessageEmailErrorOpen(true)
      console.log('Error sending email: ', error)
    }
  }

  return (<>
    <Box>
      <EmailField onChange={handleEmailChange} disabled={disabled} />
      <Button onClick={handleSendLink} text={buttonText} disabled={disabled} />
    </Box>

    <SlideInMessage handleClose={handleMessageSentClose} open={messageSentOpen} title="Email Sent">
      {sentMessage}
    </SlideInMessage>

    <SlideInMessage handleClose={handleMessageEmailErrorClose} open={messageEmailErrorOpen} title="Error sending email">
      {errorMessage}
    </SlideInMessage>
  </>)
}

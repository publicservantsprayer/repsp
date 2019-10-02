import React from 'react'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { H1 } from '../utilities/formating'
import { useFirebase } from '../firebase'

export default () => {
  const [email, setEmail] = React.useState()
  const { auth } = useFirebase()

  const handleChange = event => setEmail(event.target.value)

  const handleSendLink = () => {

  }

  return (
    <Container>
      <Box mx={2}>
        <H1>Sign In</H1>
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <Box my={2} textAlign="center">
          <Button variant="contained" size="large" onClick={handleSendLink} fullWidth>Send me an email link</Button>
        </Box>
      </Box>
    </Container >
  )
}

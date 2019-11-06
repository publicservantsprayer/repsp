import React from 'react'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import { Redirect } from 'react-router'

import Layout from '../Layout'
import SignIn from '../SignIn'
import { H1 } from '../utilities/formating'
import Content from '../Layout/Content'
import { useUser } from '../utilities/firebase'

export default function ScreenSignIn() {
  const [user] = useUser()

  if (user) {
    return <Redirect to="/profile" />
  }

  return (
    <Layout>
      <Content>
        <Container maxWidth="sm">
          <Box mx={2}>
            <H1>Sign In</H1>
            <Divider />
            <Box pt={3} pb={1}>
              <SignIn />
            </Box>
          </Box>
        </Container>
      </Content>
    </Layout>
  )
}

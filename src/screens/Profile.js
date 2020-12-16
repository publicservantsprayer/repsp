import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import Layout from '../Layout'
import Content from '../Layout/Content'
import LayoutTitle from '../Layout/Title'
import ProfileBody from '../Profile/ProfileBody'

export default function Profile() {
  return (
    <Layout>
      <Content>
        <LayoutTitle>Profile</LayoutTitle>
        <Box p={2} my={1} clone>
          <Paper>
            <ProfileBody />
          </Paper>
        </Box>
      </Content>
    </Layout>
  )
}

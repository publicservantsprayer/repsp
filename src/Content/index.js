import React from 'react'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { useHistory } from 'react-router-dom'

import Layout from '../Layout'
import Title from '../Layout/Title'
import List from './List'

export default function Content() {
  const history = useHistory()

  return (
    <Layout>
      <Box m={2} position="relative">
        <Title>Content</Title>
        <Box position="absolute" top={8} right={8}>
          <Fab color="primary" onClick={() => history.push(`/content/new`)}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <List />
    </Layout>
  )
}

import React from 'react'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { useHistory } from 'react-router-dom'

import { H1 } from '../utilities/formating'
import List from './List'

export default () => {
  const history = useHistory()

  return (
    <Box bgcolor="secondary" py={1}>
      <Box display="flex" width="100%">
        <Box flexGrow={1}>
          <H1>Content</H1>
        </Box>

        <Box mr={5} mt={5}>
          <Fab color="primary" onClick={() => history.push(`/content/new`)}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <List />
    </Box>
  )
}


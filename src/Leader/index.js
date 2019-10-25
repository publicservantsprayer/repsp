import React from 'react'

import Box from '@material-ui/core/Box'
import Info from './Info'
import { leaderPhoto, leaderUrl } from '../utilities/leader'

const Leader = ({ leader }) => {
  console.log('leader', leader)
  return (
    <Box
      my={4}
      mx={4}
      px={2}
      py={2}
      bgcolor="primary.dark"
      border={4}
      borderColor="secondary.main"
    >
      <div>
        <Box mx={2} my={1} py={0} bgcolor="primary.dark" color="secondary.main">
          <h3>
            {leader.Title} {leader.FirstName} {leader.LastName}
          </h3>
        </Box>
        <Box>
          {leader.StateCode && (
            <img border={4} src={leaderPhoto(leader)} alt={leader.PhotoFile} />
          )}
        </Box>
      </div>

      <Info leader={leader} />
    </Box>
  )
}

export default Leader

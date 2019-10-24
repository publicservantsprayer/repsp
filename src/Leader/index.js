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
      borderColor="common.white"
    >
      <div>
        <Box mx={2} my={1} py={0} bgcolor="primary.dark">
          <h3>
            {leader.Title} {leader.FirstName} {leader.LastName}
          </h3>
        </Box>
        {leader.StateCode && (
          <a href={leaderUrl(leader)}>
            <img src={leaderPhoto(leader)} alt={leader.PhotoFile} border={4} />
          </a>
        )}
      </div>

      <Info leader={leader} />
    </Box>
  )
}

export default Leader

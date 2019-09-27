import React from 'react'

import Box from '@material-ui/core/Box'
import Info from './Info'
import { leaderPhoto, leaderUrl } from '../utilities/leader'

const Leader = ({ leader }) => {
  console.log('leader', leader)
  return (
    <Box mx={0} px={0} py={0} bgcolor="primary.dark">
      <div>
        <h3>
          {leader.Title} {leader.FirstName} {leader.LastName}
        </h3>
        {leader.StateCode && (
          <a href={leaderUrl(leader)}>
            <img src={leaderPhoto(leader)} alt={leader.PhotoFile} />
          </a>
        )}
      </div>

      <Info leader={leader} />
    </Box>
  )
}

export default Leader

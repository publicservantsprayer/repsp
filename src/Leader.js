import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { leaderPhoto, leaderUrl } from './utilities/leader'

const Leader = ({ leader }) => (
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
)

export default Leader

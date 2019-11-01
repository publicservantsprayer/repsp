import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

import { leaderPhoto } from '../utilities/leader'
import useStyles from '../utilities/useStyles'
import Skeleton from '@material-ui/lab/Skeleton'

export default function LeaderPhoto({ leader }) {
  const classes = useStyles()

  return (
    <Box height={148} width="100%" maxWidth={108} m={1}>
      <Link component={RouterLink} to={`/leader/${leader.permaLink}`}>
        {!leader.PID ? (
          <Skeleton height={148} width={108} />
        ) : (
          <img
            src={leaderPhoto(leader)}
            alt="Leader"
            className={classes.borderRadius}
            style={{ width: '100%' }}
          />
        )}
      </Link>
    </Box>
  )
}

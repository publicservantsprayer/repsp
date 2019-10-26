import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { leaderPhoto } from '../utilities/leader'
import useStyles from '../utilities/useStyles'

export default ({ leader }) => {
  const classes = useStyles()

  return (
    <Box maxWidth="148" m={1}>
      <Link component={RouterLink} to={`/leader/${leader.permaLink}`}>
        <img src={leaderPhoto(leader)} alt="Leader" className={classes.roundedCorners} style={{ width: '100%' }} />
      </Link>
    </Box>
  )
}

import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'

import { leaderPhoto, leaderUrl } from '../utilities/leader'

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
})

export default function Leaders({ leaders }) {
  const classes = useStyles()
  return (
    <>
      {leaders.map(leader => (
        <Box key={leader.PID} m={1}>
          <Link component={RouterLink} to={leaderUrl(leader)} underline="hover">
            <Paper>
              <Box p={1}>
                <Box minWidth="145px" display="flex" justifyContent="center">
                  <Avatar
                    alt={leader.PhotoFile}
                    src={leaderPhoto(leader)}
                    className={classes.avatar}
                  />
                </Box>
                <Typography variant="body2" component="div" align="center" noWrap>
                  {leader.NickName} {leader.LastName}
                </Typography>
              </Box>
            </Paper>
          </Link>
        </Box>
      ))}
    </>
  )
}

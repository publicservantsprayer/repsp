import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'

import { leaderPhoto, leaderUrl } from '../utilities/leader'
import { useStateLeaders } from '../utilities/firebase'

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
})

const ActualLeaders = ({ leaders }) => {
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
const FakeLeaders = ({ leaders, legType, chamber }) => {
  const classes = useStyles()

  return (
    <>
      {leaders.map((_, i) => (
        <Box key={i} m={1}>
          <Paper>
            <Box p={1}>
              <Box minWidth="145px" display="flex" justifyContent="center">
                <Skeleton variant="circle" className={classes.avatar} />
              </Box>
              <Box display="flex" justifyContent="center">
                <Skeleton width={100} height={6} style={{ margin: 8 }} />
              </Box>
            </Box>
          </Paper>
        </Box>
      ))}
    </>
  )
}

export default function Leaders(props) {
  const [leaders, loading] = useStateLeaders(props)
  const fakeLeaders = new Array(10).fill({})

  return loading ? (
    <FakeLeaders leaders={fakeLeaders} {...props} />
  ) : (
    <ActualLeaders leaders={leaders} {...props} />
  )
}

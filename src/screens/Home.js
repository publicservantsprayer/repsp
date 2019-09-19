import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { withFirebase } from '../Firebase'
import PageTitle from '../PageTitle'
import DailyExpansionLeader from '../DailyExpansionLeader'
import { useStateCode } from '../utilities/states'

const dayOfTheWeekColor = [
  'white', // Sun white
  '#6D3C73', // Mon purple
  'tomato', // Tue red
  '#ffff99', // Wed yellow
  'darkorange', // Thu orange
  '#009933', // Fri green
  'skyblue', // Sat blue
]

const color = dayOfTheWeekColor[new Date().getDay()]

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.black,
    width: 500,
    borderWidth: '10px',
    borderStyle: 'solid',
    borderColor: color,
  },
  imgBox: {
    padding: theme.spacing(2),
  },
  container: {
    margin: 'auto',
  },
  today: {
    color: color,
  },
  leaderNames: {
    textAlign: 'center',
    alignContent: 'center',
  },
}))

const src = leader => {
  return `https://firebasestorage.googleapis.com/v0/b/repsp123-leaders/o/${leader.PhotoFile}?alt=media`
}

const Home = ({ db, location }) => {
  const stateCode = useStateCode(location)
  const [post, setPost] = useState()
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      const snap = await db
        .collection(`/states/${stateCode}/posts/`)
        .orderBy('dateID', 'desc')
        .limit(1)
        .get()
      setPost(snap.docs[0].data())
    })()
  }, [db, stateCode])

  if (!post) return null

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item>
          <Paper className={classes.paper} elevation={9}>
            <Box my={2}>
              <div>
                <PageTitle stateCode={stateCode} />
              </div>
            </Box>
            <Box my={2}>
              {post.dateID && (
                <div>
                  <h3>{moment(post.dateID).format('dddd, MMMM Do, YYYY')}</h3>
                </div>
              )}
            </Box>
            <Box my={2} className={classes.today}>
              <div>
                <h1>Today we are praying for</h1>
              </div>
            </Box>
            <Box my={2}>
              {[post.leader1, post.leader2, post.leader3].map(leader => (
                <span className={classes.imgBox}>
                  <img src={src(leader)} alt="Leader" />
                </span>
              ))}
            </Box>
            <Box my={2} mx="auto" className={classes.leaderNames}>
              {[post.leader1, post.leader2, post.leader3].map(leader => (
                <DailyExpansionLeader leader={leader} />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default withFirebase(Home)

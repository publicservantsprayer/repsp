import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import EmailIcon from 'mdi-material-ui/Email'
import FacebookIcon from 'mdi-material-ui/FacebookBox'
import TwitterIcon from 'mdi-material-ui/TwitterBox'
import InstagramIcon from 'mdi-material-ui/Instagram'

import { withFirebase } from './Firebase'
import DailyExpansionLeader from './DailyExpansionLeader'
import { useStateCode } from './utilities/states'

const dayOfTheWeekColor = [
  'white', // Sun white
  '#6D3C73', // Mon purple
  'tomato', // Tue red
  '#ffff99', // Wed yellow
  'darkorange', // Thu orange
  '#009933', // Fri green
  'skyblue' // Sat blue
]

const color = dayOfTheWeekColor[new Date().getDay()]

const useStyles = makeStyles(theme => ({
  img: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  },
}))

const src = leader => {
  return `https://firebasestorage.googleapis.com/v0/b/repsp123-leaders/o/${leader.PhotoFile}?alt=media`
}

const LeaderGridItem = ({ leader }) => {
  const classes = useStyles()
  return (
    <Grid item xs={4}>
      <img src={src(leader)} alt="Leader" className={classes.img} />
    </Grid>
  )
}


function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

const DailyLeaders = ({ db, location }) => {
  const stateCode = useStateCode(location)
  const [post, setPost] = useState()
  const classes = useStyles()

  useEffect(() => {
    (async () => {
      const snap = await db
        .collection(`/states/${stateCode}/posts/`)
        .orderBy('dateID', 'desc')
        .limit(1)
        .get()
      setPost(snap.docs[0].data())
    })()
  }, [db, stateCode])

  const [value, setValue] = React.useState(0)

  function handleChange (event, newValue) {
    setValue(newValue)
  }

  if (!post) return null

  return (
    <Box bgcolor="common.black" m={2} borderRadius="borderRadius">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Today" />
          <Tab label={<EmailIcon />} />
          <Tab label={<FacebookIcon />} />
          <Tab label={<TwitterIcon />} />
          <Tab label={<InstagramIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box mb={1} textAlign="center">
          <Typography>{moment(post.dateID).format('dddd, MMMM Do')}</Typography>
        </Box>
        <Box my={2} className={classes.today} color={color} fontWeight="bold" textAlign="center">
          <Typography variant="h5">Today we are praying for</Typography>
        </Box>
        <Box my={1} p={1}>
          <Grid container spacing={3} justify="space-evenly">
            {[post.leader1, post.leader2, post.leader3].map((leader, i) => <LeaderGridItem leader={leader} key={i} />)}
          </Grid>
        </Box>
        <Box my={2} display="block">
          {[post.leader1, post.leader2, post.leader3].map((leader, i) => (
            <DailyExpansionLeader leader={leader} key={i} />
          ))}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Subscribe via Email
      </TabPanel>
      <TabPanel value={value} index={2}>
        Follow on Facebook
      </TabPanel>
      <TabPanel value={value} index={3}>
        Follow on Twitter
      </TabPanel>
      <TabPanel value={value} index={4}>
        Follow on Instagram
      </TabPanel>
    </Box>
  )
}
export default withRouter(withFirebase(DailyLeaders))

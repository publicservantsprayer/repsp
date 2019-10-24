import React from 'react'
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
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import ExpansionPanel from './ExpansionPanel'
import TwitterTimeline from '../TwitterTimeline'
import { useStateCode } from '../utilities/states'

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
      <Link component={RouterLink} to={`/leader/${leader.permaLink}`}>
        <img src={src(leader)} alt="Leader" className={classes.img} />
      </Link>
    </Grid>
  )
}

const TabPanel = ({ children, value, index }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

const PrayingTitle = ({ dateID }) => {
  if (moment().isSame(moment(dateID), 'day')) {
    return <Typography variant="h5">Today we are praying for</Typography>
  } else {
    return <Typography variant="h5">This day we prayed for</Typography>
  }
}

export default ({ post }) => {
  const classes = useStyles()
  const stateCode = useStateCode()
  const [tabIndex, setTabIndex] = React.useState(0)

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex)
  }

  return (
    <Box bgcolor="common.black" m={2} borderRadius="borderRadius">
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Today" />
          <Tab label={<EmailIcon />} />
          <Tab label={<FacebookIcon />} />
          <Tab label={<TwitterIcon />} />
          <Tab label={<InstagramIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <Box mb={1} textAlign="center">
          <Typography>{moment(post.dateID).format('dddd, MMMM Do')}</Typography>
        </Box>
        <Box
          my={2}
          className={classes.today}
          fontWeight="bold"
          textAlign="center"
        >
          <PrayingTitle dateID={post.dateID} />
        </Box>
        <Box my={1} p={1}>
          <Grid container spacing={3} justify="space-evenly">
            {[post.leader1, post.leader2, post.leader3].map((leader, i) => (
              <LeaderGridItem leader={leader} key={i} />
            ))}
          </Grid>
        </Box>
        <Box my={2} display="block">
          {[post.leader1, post.leader2, post.leader3].map((leader, i) => (
            <ExpansionPanel leader={leader} key={i} />
          ))}
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Subscribe via Email
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Follow on Facebook
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <Paper><TwitterTimeline accountName={`Praying4_${stateCode}`} /></Paper>
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        Follow on Instagram
      </TabPanel>
    </Box>
  )
}

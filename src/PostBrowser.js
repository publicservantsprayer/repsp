import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useCookies } from 'react-cookie'
import { withFirebase } from './Firebase'

const TabPanel = ({ children, value, index, ...other }) =>
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}>
    <Box p={3}>{children}</Box>
  </Typography>

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps (index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 700,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  postImage: {
    width: '100%',
  }
}))

const PostBrowser = ({ db }) => {
  const [posts, setPosts] = useState()
  const [cookies] = useCookies(['stateCode'])
  const stateCode = cookies.stateCode

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange (event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    if (stateCode) {
      (async () => {
        const snap = await db.collection(`/states/${stateCode}/posts/`).orderBy('dateID', 'desc').limit(14).get()
        console.log('getting leader data')
        setPosts(snap.docs.map(post => post.data()))
      })()
    }
  }, [db, stateCode])

  if (!posts) return null

  const src = post => {
    const [year, month, day] = post.dateID.split('-')
    return `https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/` +
      `${year}%2F${month}%2F${day}%2F${post.dateID}_psp_${stateCode}.png?alt=media`
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {posts.map((post, i) => <Tab label={post.dateID} {...a11yProps(i)} />)}
      </Tabs>
      {posts.map((post, i) => {
        return (
          <TabPanel value={value} index={i}>
            <img className={classes.postImage} src={src(post)} alt="whatever" />
          </TabPanel>
        )
      })}
    </div>
  )
}

export default withFirebase(PostBrowser)

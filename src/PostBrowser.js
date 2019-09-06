import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useCookies } from 'react-cookie'
import { withFirebase } from './Firebase'

function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

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
}))

const PostBrowser = ({ db }) => {
  const [posts, setPosts] = useState()
  const [cookies] = useCookies(['stateCode'])
  const stateCode = cookies.stateCode || 'TX'

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange (event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    (async () => {
      const snap = await db.collection(`/states/${stateCode}/posts/`).orderBy('dateID', 'desc').limit(7).get()
      console.log('getting leader data')
      setPosts(snap.docs.map(post => post.data()))
    })()
  }, [db, stateCode])

  if (!posts) return null

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
        const [year, month, day] = post.dateID.split('-')
        return (
          <TabPanel value={value} index={i}>
            <img src={`https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/${year}%2F${month}%2F${day}%2F${post.dateID}_psp_${stateCode}.png?alt=media`} alt="whatever" />
          </TabPanel>
        )
      })}
    </div>
  )
}

export default withFirebase(PostBrowser)

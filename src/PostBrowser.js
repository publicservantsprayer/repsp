import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { useFirebase } from './utilities/firebase'
import useUSAState from './utilities/useUSAState'

const TabPanel = ({ children, value, index }) => (
  <Typography component="div" role="tabpanel" hidden={value !== index}>
    <Box p={3}>{children}</Box>
  </Typography>
)

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
  },
}))

export default function PostBrowser() {
  const [posts, setPosts] = useState()
  const { stateCode } = useUSAState()
  const { db } = useFirebase()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  useEffect(() => {
    if (stateCode) {
      ;(async () => {
        const snap = await db
          .collection(`/states/${stateCode}/posts/`)
          .orderBy('dateID', 'desc')
          .limit(14)
          .get()
        console.log('getting leader data')
        setPosts(snap.docs.map(post => post.data()))
      })()
    }
  }, [db, stateCode])

  if (!posts) return null

  const src = post => {
    const [year, month, day] = post.dateID.split('-')
    return (
      `https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/` +
      `${year}%2F${month}%2F${day}%2F${post.dateID}_psp_${stateCode}.png?alt=media`
    )
  }

  return (
    <>
      <h2>Posts from the past two weeks</h2>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={classes.tabs}>
          {posts.map((post, i) => (
            <Tab key={i} label={post.dateID} />
          ))}
        </Tabs>
        {posts.map((post, i) => {
          return (
            <TabPanel value={value} index={i} key={i}>
              <img className={classes.postImage} src={src(post)} alt="daily post" />
            </TabPanel>
          )
        })}
      </div>
    </>
  )
}

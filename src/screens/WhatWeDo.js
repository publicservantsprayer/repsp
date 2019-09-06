import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import PostBrowser from '../PostBrowser'

const WhatWeDo = () => {
  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={10} sm={8}>
        <p>Every day, we focus on three legislators in each state, committing thoughts and prayers to them throughout the day.  Our country's political leaders, from the 532 members of the US Congress to the thousands at the state level, are faced with difficult decisions every day in addition to balancing their personal lives with family and friends. Too often, it’s easy to forget about the person behind the political decisions they make. But if we take a moment to remember their humanity, it allows us to see each one as a child of God who needs prayer just like you and I.</p>
        <p>At 6:00am each morning, thepsp.org selects three legislators from each state in alphabetical order and creates a social media post reminding us of who to pray for.  This goes out via Email, Facebook, Twitter and Instagram.</p>
        <p>Here are the posts from this past week</p>

        <PostBrowser />
      </Grid>
      <Grid item xs></Grid>
    </Grid >
  )
}

export default WhatWeDo

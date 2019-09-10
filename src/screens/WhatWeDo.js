import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import { H1, H2, P } from '../utilities/formating'
import PostBrowser from '../PostBrowser'

const WhatWeDo = () => {
  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={10} sm={8}>
        <H1>what we do</H1>

        <P>Every day, we focus on three legislators in each state, committing thoughts and prayers to them throughout the day.</P>

        <P>At 6:00am each morning, this website selects three legislators from each state in alphabetical order and creates a social media post reminding us of who to pray for.  This goes out via Email, Facebook, Twitter and Instagram.</P>

        <P>More soon...</P>

        <H2>Here are the posts from the past two weeks</H2>

        <Box p={2} mt={3}>
          <PostBrowser />
        </Box>
      </Grid>
      <Grid item xs></Grid>

    </Grid >
  )
}

export default WhatWeDo

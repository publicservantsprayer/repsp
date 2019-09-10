import React from 'react'
import Grid from '@material-ui/core/Grid'

import { H1, P } from '../utilities/formating'


const WhyWePray = () => {
  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={10} sm={8}>
        <H1>why we pray</H1>

        <P>Our country's political leaders, from the 532 members of the US Congress to the thousands at the state level, are faced with difficult decisions every day in addition to balancing their personal lives with family and friends.</P>

        <P>Too often, it’s easy to forget about the person behind the political decisions they make. But if we take a moment to remember their humanity, it allows us to see each one as a child of God who needs prayer just like you and I.</P>

        <P>More soon...</P>

      </Grid>
      <Grid item xs></Grid>
    </Grid >
  )
}

export default WhyWePray

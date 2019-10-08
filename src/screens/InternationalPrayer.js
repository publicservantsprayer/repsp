import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { withFirebase } from '../firebase'
import { H1, P } from '../utilities/formating'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
})

const InternationalPrayer = ({ match, db }) => {
  const id = match.params.id
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={10} sm={8}>
        <h2>World Wide Prayer Warriors</h2>
        <hr />
        <h3>Getting a chance to pray with leaders around the world</h3>
        <P>
          Recently our team traveled to Israel for a global conference with
          those who lead similar ministries for public officials. Words cannot
          express how excited we were to see God raising up ministry leaders all
          over the world. God has a heart for the souls of those in political
          power. Seeing God move in similar ways around the world was a
          confirmation of the vision Public Servants’ Prayer has adopted. God is
          doing a great work around the globe!
        </P>

        <P>
          Matt was also honored with a request to join the “Jerusalem Prayer
          Breakfast” Board. This organization held their first prayer summit in
          2017. Our hope is that this event will grow to become a global
          gathering of Christians. Please pray for guidance from God as well as
          exponential growth in this new partnership.
        </P>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  )
}

export default withFirebase(InternationalPrayer)

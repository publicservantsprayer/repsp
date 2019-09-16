import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import wiki from 'wikijs'
import WebIcon from '@material-ui/icons/Web'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import ContactMailIcon from '@material-ui/icons/ContactMail'

import { useStateCode } from './utilities/states'

const useStyles = makeStyles({
  media: {
    height: 250,
  },
  rightIcon: {},
  button: {},
})

const LeaderInfo = ({ location, leader }) => {
  const [blurb, setBlurb] = useState()
  const classes = useStyles()
  const stateCode = useStateCode(location)

  useEffect(() => {
    wiki()
      .page(`${leader.FirstName} ${leader.LastName}`)
      .then(page => page.summary())
      .then(summary => {
        setBlurb(summary)
        console.log(summary)
      })
  }, [])

  return (
    <Box>
      <Box>
        <p>{blurb}</p>
      </Box>
      <Box>
        <li>District:</li>
        <li>Elected Since:</li>
        <li>Spouse:</li>
        <li>Family:</li>
        <li>Birthday:</li>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Website <WebIcon className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Facebook <FacebookIcon className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Twitter <TwitterIcon className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Contact <ContactMailIcon className={classes.rightIcon} />
        </Button>
      </Box>
    </Box>
  )
}

export default LeaderInfo

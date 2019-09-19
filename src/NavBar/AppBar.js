import React, { useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'


import { stateName, useStateCode } from '../utilities/states'

const useStyles = makeStyles(theme => ({
  AppBar: {
    zIndex: theme.zIndex.drawer + 1000,
  },
  header: {
    [theme.breakpoints.up('md')]: {
      background: 'url("/images/capitol-color-night.jpg") top left no-repeat',
      backgroundPositionY: '-400px',
    },
    [theme.breakpoints.down('sm')]: {
      background: 'url("/images/capitol-color-night-700.jpg") top left no-repeat',
      backgroundPositionY: '-100px',
    },
    backgroundAttachment: 'fixed',
    overflow: 'hidden',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

const AppBar = ({ stateCode, toggleDrawer }) => {
  const [svgStyle, setSvgStyle] = useSpring(() => ({ transform: 'scale(0.1)' }))
  const [headerStyle, setHeaderStyle] = useSpring(() => ({ height: '350px' }))
  const classes = useStyles()

  let headerOpen = false
  const openFindState = () => {
    headerOpen = true
    setHeaderStyle({ height: '1250px' })
    setSvgStyle({ transform: 'scale(3)' })
  }
  const closeFindState = () => {
    headerOpen = false
    setHeaderStyle({ height: '250px' })
    setSvgStyle({ transform: 'scale(0.1)' })
  }
  const toggleFindState = () => {
    if (headerOpen) {
      closeFindState()
    } else {
      openFindState()
    }
  }

  return (
    <MuiAppBar position="fixed" className={classes.AppBar}>
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6">
            {stateName(stateCode)}
          </Typography>
        </Box>
        <IconButton onClick={toggleDrawer()} edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Hidden smDown>
          <Button color="inherit" component={RouterLink} to="/articles">Articles</Button>
          <Button color="inherit" component={RouterLink} to={`/states/${stateCode.toLowerCase()}/leaders`}>State Leaders</Button>
          <ClickAwayListener onClickAway={closeFindState}>
            <Button color="inherit" onClick={toggleFindState}>Find your State</Button>
          </ClickAwayListener>
          <Button color="inherit" component={RouterLink} to="/what-we-do">What we do</Button>
          <Button color="inherit" component={RouterLink} to="/why-we-pray">Why we pray</Button>
        </Hidden>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar

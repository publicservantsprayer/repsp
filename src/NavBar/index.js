import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'

import { useStateCode } from '../utilities/states'
import AppBar from './AppBar'

import Map from '../SVGMap'
import DrawerMenu from './DrawerMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    [theme.breakpoints.up('sm')]: {
      background: 'url("/images/capitol-color-night.jpg") top left no-repeat',
      backgroundPositionY: '-400px',
    },
    [theme.breakpoints.down('xs')]: {
      background: 'url("/images/capitol-color-night-700.jpg") top left no-repeat',
      backgroundPositionY: '-150px',
    },
    backgroundAttachment: 'fixed',
    overflow: 'hidden',
  },
  logoPaper: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
  logo: {
    width: '100%',
  },
}))

const NavBar = ({ location }) => {
  const height = '180px'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [headerStyle, setHeaderStyle] = useSpring(() => ({ height: height }))
  const [svgStyle, setSvgStyle] = useSpring(() => ({ transform: 'scale(0.1)' }))
  const classes = useStyles()
  const stateCode = useStateCode(location)

  let headerOpen = false
  const openFindState = () => {
    headerOpen = true
    setHeaderStyle({ height: '1250px' })
    setSvgStyle({ transform: 'scale(1)' })
  }
  const closeFindState = () => {
    headerOpen = false
    setHeaderStyle({ height: height })
    setSvgStyle({ transform: 'scale(0.1)' })
  }
  const toggleFindState = () => {
    if (headerOpen) {
      closeFindState()
    } else {
      openFindState()
    }
  }
  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div className={classes.root}>
      <AppBar stateCode={stateCode} toggleDrawer={toggleDrawer} />
      <Toolbar />

      <Hidden smUp>
        <DrawerMenu
          toggleDrawer={toggleDrawer}
          toggleFindState={toggleFindState}
          drawerOpen={drawerOpen}
          stateCode={stateCode} />
      </Hidden>

      <animated.div className={classes.header} style={headerStyle}>
        <Box m={3}>
          <Paper className={classes.logoPaper} square>
            <img className={classes.logo} src="/images/public-servants-prayer.png" alt="public servants' prayer" />
          </Paper>
        </Box>

        <Map svgStyle={svgStyle} closeFindState={closeFindState} />
      </animated.div>
    </div >
  )
}

export default NavBar

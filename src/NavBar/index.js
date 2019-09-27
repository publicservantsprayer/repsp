import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'

import { useStateCode } from '../utilities/states'
import AppBar from './AppBar'

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
    height: '180px'
  },
  logoPaper: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
  logo: {
    width: '100%',
  },
}))

const NavBar = ({ location }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()
  const stateCode = useStateCode(location)

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
          drawerOpen={drawerOpen}
          stateCode={stateCode} />
      </Hidden>

      <Box className={classes.header}>
        <Box m={3}>
          <Paper className={classes.logoPaper} square>
            <img className={classes.logo} src="/images/public-servants-prayer.png" alt="public servants' prayer" />
          </Paper>
        </Box>
      </Box>
    </div >
  )
}

export default NavBar

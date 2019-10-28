import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import useUSAState from '../utilities/useUSAState'
import AppBar from './AppBar'
import DrawerMenu from './DrawerMenu'
import DailyLeaders from '../DailyLeaders'
import MobileOnly from '../MobileOnly'
import DesktopOnly from '../DesktopOnly'
import useDesktop from '../utilities/useDesktop'
import useHomePath from '../utilities/useHomePath'
import { useLocation, useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  header: {
    [theme.breakpoints.up('sm')]: {
      background: 'url("/images/capitol-color-night.jpg") top left no-repeat',
      backgroundPositionY: '-400px',
      //height: '220px',
    },
    [theme.breakpoints.down('xs')]: {
      background:
        'url("/images/capitol-color-night-700.jpg") top left no-repeat',
      backgroundPositionY: '-150px',
      height: '180px',
    },
    backgroundAttachment: 'fixed',
    overflow: 'hidden',
  },
  logoPaper: {
    background: 'rgba(0, 0, 0, 0.6)',
    [theme.breakpoints.up('sm')]: {
      width: '38%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }

  },
  logo: {
    width: '100%',
  },
}))

const NavBarDailyLeaders = () => {
  const desktop = useDesktop()
  const homePath = useHomePath()
  const location = useLocation()
  const { year, month, day } = useParams()
  const todaysHome = homePath === location.pathname
  const historicalHome = year && month && day
  const home = todaysHome || historicalHome

  if (desktop && home) return (
    <Box display="flex" justifyContent="center" m={1} w={1}>
      <DailyLeaders />
    </Box>
  )

  return null
}

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()
  const { stateCode } = useUSAState()

  const toggleDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box>
      <AppBar stateCode={stateCode} toggleDrawer={toggleDrawer} />
      <Toolbar />

      <DrawerMenu
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        stateCode={stateCode}
      />

      <Box className={classes.header}>
        <Box mx={3} mt={3} mb={8}>
          <Paper className={classes.logoPaper} square>
            <img
              className={classes.logo}
              src="/images/public-servants-prayer.png"
              alt="public servants' prayer"
            />
          </Paper>
        </Box>

        <NavBarDailyLeaders />
      </Box>
    </Box>
  )
}

export default NavBar

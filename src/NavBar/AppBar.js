import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import MapIcon from '@material-ui/icons/Map'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreIcon from '@material-ui/icons/MoreVert'

import MobileOnly from '../MobileOnly'
import DesktopOnly from '../DesktopOnly'
import useUSAState from '../utilities/useUSAState'

const useStyles = makeStyles(theme => ({
  AppBar: {
    zIndex: theme.zIndex.drawer + 1000,
    backgroundColor: theme.palette.background.default,
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
  button: {
    margin: theme.spacing(1),
  },
}))

const Item = ({ text, to, Icon }) => {
  const classes = useStyles()

  return (
    <Button
      color="inherit"
      component={RouterLink}
      to={to}
      startIcon={<Icon />}
      className={classes.button}>
      {text}
    </Button>
  )
}

export default function AppBar({ toggleDrawer }) {
  const classes = useStyles()
  const { stateName } = useUSAState()

  return (
    <MuiAppBar color="inherit" position="fixed" className={classes.AppBar}>
      <Toolbar variant="regular">
        <Box flexGrow={1}>
          <Typography variant="h6" color="inherit">
            PSP {stateName}
          </Typography>
        </Box>

        <MobileOnly>
          <IconButton onClick={toggleDrawer()} edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        </MobileOnly>

        <DesktopOnly>
          <Item text="Home" Icon={HomeIcon} to="/" />
          <Item text="Find Your State" Icon={MapIcon} to="/find-your-state" />
          <Item text="What We Do" Icon={PeopleIcon} to="/what-we-do" />
          <Item text="Why We Pray" Icon={FavoriteIcon} to="/why-we-pray" />

          <IconButton onClick={toggleDrawer()} edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </DesktopOnly>
      </Toolbar>
    </MuiAppBar>
  )
}

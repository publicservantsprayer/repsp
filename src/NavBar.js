/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import MapIcon from '@material-ui/icons/Map'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListItemText from '@material-ui/core/ListItemText'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { stateName, useStateCode } from './utilities/states'

import Map from './SVGMap'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1000,
  },
  header: {
    background: 'url("/images/capitol-color-night.jpg") top left no-repeat',
    backgroundAttachment: 'fixed',
    xheight: '250px',
    backgroundPositionY: '-400px',
    xmarginBottom: theme.spacing(3),
    padding: '20px',
    overflow: 'hidden',
  },
  smallLogo: {
    height: '40px',
    display: 'block',
    marginRight: theme.spacing(2),
  },
  logoPaper: {
    xwidth: 450,
    background: 'rgba(0, 0, 0, 0.6)',
  },
  logo: {
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoBox: {
    xflexGrow: 5,
  },
  nav: {
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.6)',
  },
}))

const NavBar = ({ location }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [headerStyle, setHeaderStyle] = useSpring(() => ({ height: '350px' }))
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
  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return

    setDrawerOpen(open)
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {stateName(stateCode)}
          </Typography>
          <Button color="inherit" component={RouterLink} to={`/states/${stateCode.toLowerCase()}`}>Home</Button>
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
      </AppBar>
      <Toolbar />
      <Hidden mdUp>
        <Drawer open={drawerOpen} anchor="left" onClose={toggleDrawer(false)} onClick={toggleDrawer(false)} variant="temporary">
          <Toolbar />
          <List>
            <ListItem button component={RouterLink} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={RouterLink} to="/what-we-do">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="What We Do" />
            </ListItem>
            <ListItem button onClick={toggleFindState}>
              <ListItemIcon><MapIcon /></ListItemIcon>
              <ListItemText primary="Find Your State" />
            </ListItem>
            <ListItem button component={RouterLink} to="/why-we-pray" selected>
              <ListItemIcon><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="Why We Pray" />
            </ListItem>
            <ListItem button component={RouterLink} to="/articles">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Articles" />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
      <Button className={classes.mapButton} />
      <animated.div className={classes.header} style={headerStyle}>
        <Grid container spacing={2} justify="center" alignItems="center" style={{ height: 300 }}>
          <Grid item xs={10} md={6} lg={6} xl={4}>
            <Paper className={classes.logoPaper} square>
              <img className={classes.logo} src="/images/public-servants-prayer.png" alt="public servants' prayer" />
            </Paper>
          </Grid>
        </Grid>
        <Map svgStyle={svgStyle} closeFindState={closeFindState} />
      </animated.div>
    </div >
  )
}

export default NavBar

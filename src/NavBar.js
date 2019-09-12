/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
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
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { stateName, useStateCode } from './utilities/states'

import Map from './SVGMap'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  const [headerStyle, setHeaderStyle] = useSpring(() => ({ height: '350px' }))
  const [svgStyle, setSvgStyle] = useSpring(() => ({ transform: 'scale(0.1)' }))
  const classes = useStyles()
  const stateCode = useStateCode(location)

  let headerOpen = false
  const openFindState = () => {
    headerOpen = true
    setHeaderStyle({ height: '1350px' })
    setSvgStyle({ transform: 'scale(1)' })
  }
  const closeFindState = () => {
    headerOpen = false
    setHeaderStyle({ height: '350px' })
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
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {stateName(stateCode)}
          </Typography>
          <Button color="inherit" component={RouterLink} to="/articles">Articles</Button>
          <Button color="inherit" component={RouterLink} to={`/states/${stateCode.toLowerCase()}`}>Daily Leaders</Button>
          <Button color="inherit" component={RouterLink} to={`/states/${stateCode.toLowerCase()}/leaders`}>State Leaders</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <animated.div className={classes.header} style={headerStyle}>
        <Grid container spacing={2} justify="center" alignItems="center" style={{ height: 300 }}>
          <Hidden smDown>
            <Grid item></Grid>
          </Hidden>
          <Grid item xs={10} md={6} lg={6} xl={4}>
            <Paper className={classes.logoPaper} square>
              <img className={classes.logo} src="/images/public-servants-prayer.png" alt="public servants' prayer" />
            </Paper>
          </Grid>
          <Hidden smDown>
            <Grid item></Grid>
          </Hidden>

          <Grid container spacing={2} justify="center" alignItems="center" >
            <Hidden xsDown>
              <Grid item sm={1}></Grid>
            </Hidden>
            <Grid item xs={10} sm={3}>
              <Paper className={classes.nav}>
                <Button color="inherit" size="large" component={RouterLink} to="/what-we-do">What we do</Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={3}>
              <Paper className={classes.nav}>
                <ClickAwayListener onClickAway={closeFindState}>
                  <Button color="inherit" size="large" onClick={() => toggleFindState()}>Find your State</Button>
                </ClickAwayListener>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={3}>
              <Paper className={classes.nav}>
                <Button color="inherit" size="large" component={RouterLink} to="/why-we-pray">Why we pray</Button>
              </Paper>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={1}></Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Map svgStyle={svgStyle} closeFindState={closeFindState} />
      </animated.div>
    </div >
  )
}

export default NavBar

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
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'

import Map from './SVGMap'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    background: 'url("/images/capitol-color-night.jpg") top left no-repeat',
    backgroundAttachment: 'fixed',
    xheight: '250px',
    backgroundPositionY: '-450px',
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

function HideOnScroll (props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 310,
  })

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  )
}

const NavBar = (props) => {
  const [headerStyle, setHeaderStyle] = useSpring(() => ({ height: '300px' }))
  const [svgStyle, setSvgStyle] = useSpring(() => ({ transform: 'scale(0.1)' }))
  const stateCode = props.location.pathname.split('/')[2]
  const classes = useStyles()
  let headerOpen = false
  const toggleFindState = () => {
    if (headerOpen) {
      headerOpen = false
      setHeaderStyle({ height: '350px' })
      setSvgStyle({ transform: 'scale(0.1)' })
    } else {
      headerOpen = true
      setHeaderStyle({ height: '1350px' })
      setSvgStyle({
        transform: 'scale(1)'
      })
    }
  }

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <img className={classes.smallLogo} src="/images/public-servants-prayer-scaled.png" alt="public servants' prayer" />
            </Typography>
            <Button color="inherit" component={RouterLink} to="/articles">Articles</Button>
            {stateCode &&
              <>
                <Button color="inherit" component={RouterLink} to={`/states/${stateCode}`}>Daily Leaders</Button>
                <Button color="inherit" component={RouterLink} to={`/states/${stateCode}/leaders`}>State Leaders</Button>
              </>
            }
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

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
                <Button color="inherit" size="large" onClick={() => toggleFindState()}>Find your State</Button>
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
        <Map svgStyle={svgStyle} toggleFindState={toggleFindState} />
      </animated.div>
    </div >
  )
}

export default NavBar

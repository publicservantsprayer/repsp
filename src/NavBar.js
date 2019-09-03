/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    background: 'url("/images/capitol-at-dusk.jpg") top left no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: '4500px',
    height: '350px',
    backgroundPositionX: '-2200px',
    backgroundPositionY: '-800px',
    marginBottom: '3em'
  },
  smallLogo: {
    height: '40px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoBox: {
    flexGrow: 5,
  },
}))

function HideOnScroll (props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  )
}

const NavBar = (props) => {
  const stateCode = props.location.pathname.split('/')[2]
  const routerLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props}></Link>)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Box className={classes.logoBox}>
              <img className={classes.smallLogo} src="/images/public-servants-prayer-scaled.png" alt="public servants' prayer" />
            </Box>
            <Typography variant="h6" className={classes.title}>
              Articles
          </Typography>
            <Button color="inherit" component={routerLink} to="/articles">Articles</Button>
            {stateCode &&
              <>
                <Button color="inherit" component={routerLink} to={`/states/${stateCode}`}>Daily Leaders</Button>
                <Button color="inherit" component={routerLink} to={`/states/${stateCode}/leaders`}>State Leaders</Button>
              </>
            }
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.header}>
        <Toolbar />
        <img className={classes.logo} src="/images/public-servants-prayer.png" alt="public servants' prayer" />
      </div>
    </div >
  )
}

export default NavBar

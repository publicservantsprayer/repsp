import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
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

const DrawerMenu = ({
  drawerOpen,
  toggleDrawer,
  toggleFindState,
  stateCode,
}) => {
  return (
    <Drawer
      open={drawerOpen}
      anchor="right"
      onClose={toggleDrawer(false)}
      onClick={toggleDrawer(false)}
      variant="temporary"
    >
      <Toolbar />
      <List>
        <ListItem
          button
          component={RouterLink}
          to={`/states/${stateCode.toLowerCase()}`}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/what-we-do">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="What We Do" />
        </ListItem>
        <ListItem button component={RouterLink} to="/find-your-state">
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Find Your State" />
        </ListItem>
        <ListItem button component={RouterLink} to="/why-we-pray" selected>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Why We Pray" />
        </ListItem>
        <ListItem button component={RouterLink} to="/articles">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
        <ListItem button component={RouterLink} to="/news">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={RouterLink} to="/events">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button component={RouterLink} to="/updates">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Updates" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default DrawerMenu

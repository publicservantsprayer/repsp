import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import MapIcon from '@material-ui/icons/Map'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import EventIcon from '@material-ui/icons/Event'
import PostAddIcon from '@material-ui/icons/PostAdd'
import InfoIcon from '@material-ui/icons/Info'

const ListItem = ({ Icon, text, to }) => {
  const location = useLocation()
  const selected = to === location.pathname

  return (
    <MuiListItem button component={RouterLink} to={to} selected={selected}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </MuiListItem>
  )
}

export default ({ drawerOpen, toggleDrawer, stateCode }) => {
  const homeUrl = `/states/${stateCode.toLowerCase()}`

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
        <ListItem text="Home" Icon={HomeIcon} to={homeUrl} />
        <ListItem text="What We Do" Icon={PeopleIcon} to="/what-we-do" />
        <ListItem text="Find Your State" Icon={MapIcon} to="/find-your-state" />
        <ListItem text="Why We Pray" Icon={FavoriteIcon} to="/why-we-pray" />
        <ListItem text="Articles" Icon={DashboardIcon} to="/articles" />
        <ListItem text="News" Icon={LocalLibraryIcon} to="/news" />
        <ListItem text="Events" Icon={EventIcon} to="/events" />
        <ListItem text="Updates" Icon={PostAddIcon} to="/updates" />
        <ListItem text="About" Icon={InfoIcon} to="/about" />
        <ListItem
          text="Women's Ministry"
          Icon={InfoIcon}
          to="/womens-ministry"
        />
      </List>
    </Drawer>
  )
}

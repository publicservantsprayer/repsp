import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useUser, useAdmin } from '../firebase'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import MapIcon from '@material-ui/icons/Map'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import EventIcon from '@material-ui/icons/Event'
import PostAddIcon from '@material-ui/icons/PostAdd'
import InfoIcon from '@material-ui/icons/Info'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useHomePath } from '../utilities/states'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

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
  if (!stateCode) return null
  const [user] = useUser()
  const [admin] = useAdmin()
  const homePath = useHomePath()

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
        <ListItem text="Home" Icon={HomeIcon} to={homePath} />
        <ListItem text="Find Your State" Icon={MapIcon} to="/find-your-state" />
        <ListItem text="What We Do" Icon={PeopleIcon} to="/what-we-do" />
        <ListItem text="Why We Pray" Icon={FavoriteIcon} to="/why-we-pray" />
        <Divider />
        <ListItem text="Articles" Icon={DashboardIcon} to="/articles" />
        <ListItem text="Events" Icon={EventIcon} to="/events" />
        <ListItem text="Updates" Icon={PostAddIcon} to="/updates" />
        <ListItem text="Women's Ministry" Icon={VpnKeyIcon} to="/women" />
        <Divider />
        <ListItem text="Give/Volunteer" Icon={InfoIcon} to="/give" />
        <ListItem text="Sponsored By" Icon={InfoIcon} to="/sponsored-by" />
        <Divider />
        {user && <Box m={2}>{user.email}</Box>}
        {!user && (
          <ListItem text="Sign In" Icon={AccountCircleIcon} to="/sign-in" />
        )}
        {user && (
          <ListItem text="Sign Out" Icon={AccountCircleIcon} to="/sign-out" />
        )}
        {admin && (
          <ListItem text="Content" Icon={DashboardIcon} to="/content" />
        )}
      </List>
    </Drawer>
  )
}

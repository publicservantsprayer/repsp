import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
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
import EventIcon from '@material-ui/icons/Event'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import TwitterIcon from 'mdi-material-ui/TwitterBox'
import FilterVintageIcon from '@material-ui/icons/FilterVintage'
import NaturePeopleIcon from '@material-ui/icons/NaturePeople'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'

import { useUser, useAdmin } from '../utilities/firebase'
import MobileOnly from '../MobileOnly'
import useHomePath from '../utilities/useHomePath'

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

export default function DrawerMenu({ drawerOpen, toggleDrawer, stateCode }) {
  const [user] = useUser()
  const [admin] = useAdmin()
  const homePath = useHomePath()

  if (!stateCode) return null

  return (
    <Drawer
      open={drawerOpen}
      anchor="right"
      onClose={toggleDrawer(false)}
      onClick={toggleDrawer(false)}
      variant="temporary">
      <Toolbar />
      <List>
        <MobileOnly>
          <ListItem text="Home" Icon={HomeIcon} to={homePath} />
          <ListItem text="Find Your State" Icon={MapIcon} to="/find-your-state" />
          <ListItem text="What We Do" Icon={PeopleIcon} to="/what-we-do" />
          <ListItem text="Why We Pray" Icon={FavoriteIcon} to="/why-we-pray" />

          <Divider />
        </MobileOnly>

        <ListItem text="Articles" Icon={DashboardIcon} to="/articles" />
        <ListItem text="Events" Icon={EventIcon} to="/events" />
        <ListItem text="Matt's Updates" Icon={PostAddIcon} to="/updates" />
        <ListItem text="Women's Ministry" Icon={FilterVintageIcon} to="/women" />

        <Divider />

        <ListItem text="Give/Volunteer" Icon={SupervisedUserCircleIcon} to="/give" />
        <ListItem text="Our Partners" Icon={NaturePeopleIcon} to="/our-partners" />

        <Divider />

        {!user && <ListItem text="Sign In" Icon={AccountCircleIcon} to="/sign-in" />}

        {user && <Box m={2}>{user.email}</Box>}
        {user && <ListItem text="Profile" Icon={AccountBoxIcon} to="/profile" />}
        {user && <ListItem text="Sign Out" Icon={ExitToAppIcon} to="/sign-out" />}
        {admin && (
          <>
            <ListItem text="Content" Icon={DashboardIcon} to="/content" />
            <ListItem text="Twitter Accounts" Icon={TwitterIcon} to="/twitter-accounts" />
            <ListItem text="Data Import" Icon={TwitterIcon} to="/data" />
          </>
        )}
      </List>
    </Drawer>
  )
}

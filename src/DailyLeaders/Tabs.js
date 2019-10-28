import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import EmailIcon from 'mdi-material-ui/Email'
import FacebookIcon from 'mdi-material-ui/FacebookBox'
import TwitterIcon from 'mdi-material-ui/TwitterBox'
import useStyles from '../utilities/useStyles'
import useMobile from '../utilities/useMobile'
//import InstagramIcon from 'mdi-material-ui/Instagram'

export default ({ tabIndex, onChange, centered, fullWidth }) => {
  const classes = useStyles()
  const mobile = useMobile()

  const className = mobile ? null : classes.topBorderRadius
  const variant = mobile ? 'fullWidth' : 'standard'

  return (
    <AppBar position="static" color="primary" className={className}>
      <Tabs value={tabIndex} onChange={onChange} variant={variant} centered={centered} textColor="secondary">
        <Tab label="Today" />
        <Tab icon={<EmailIcon />} />
        <Tab icon={<FacebookIcon />} />
        <Tab icon={<TwitterIcon />} />
        {/* <Tab label={<InstagramIcon />} /> */}
      </Tabs>
    </AppBar>
  )
}

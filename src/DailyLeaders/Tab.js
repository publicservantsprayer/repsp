import React from 'react'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '108px'
  },
}))

export default props => {
  const classes = useStyles()

  return (
    <Tab classes={{ root: classes.root }} {...props} />
  )
}

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '90%',
      padding: theme.spacing(1),
      alignItems: 'center'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '0%',
      textAlign: 'center',
      alignItems: 'center'
    },
    icon: {
      margin: theme.spacing(1),
      color: 'secondary.dark',
      fontSize: 'medium'
    }
  }
})

function LeaderListItem(props) {
  const text = props.text
  const classes = useStyles()

  return (
    <ListItem>
      <ListItemIcon>
        <StarIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default function DailyExpansionLeader(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const leader = props.leader

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const items = []
  if (leader.Spouse) items.push(`Spouse: ${leader.Spouse}`)
  if (leader.Family) items.push(`Family: ${leader.Family}`)
  items.push(`Birthday: 06/06/1979`)

  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          className={classes.heading}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography>
            {leader.Title} {leader.FirstName} {leader.LastName}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            <List component="nav" aria-label="contacts">
              {items.map(text => (
                <LeaderListItem text={text} />
              ))}
            </List>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

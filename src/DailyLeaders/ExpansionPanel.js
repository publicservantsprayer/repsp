import React, { useState } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import MuiTableRow from '@material-ui/core/TableRow'


function TableRow ({ name, data }) {
  if (!data) return null

  return (
    <MuiTableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{data}</TableCell>
    </MuiTableRow>
  )
}

export default ({ leader }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <ExpansionPanel
      expanded={expanded === 'panel'}
      onChange={handleChange('panel')}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}>
        <Typography>
          {leader.FirstName} {leader.LastName}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table>
          <TableBody>
            <TableRow name="Title" data={leader.Title} />
            <TableRow name="Spouse" data={leader.Spouse} />
            <TableRow name="Family" data={leader.Family} />
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

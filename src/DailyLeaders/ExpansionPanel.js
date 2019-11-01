import React, { useState } from 'react'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import MuiTableRow from '@material-ui/core/TableRow'
import Skeleton from '@material-ui/lab/Skeleton'

function TableRow({ name, data }) {
  if (!data) return null

  return (
    <MuiTableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{data}</TableCell>
    </MuiTableRow>
  )
}

const LeaderName = ({ leader }) => {
  return leader.PID ? (
    <Typography>
      {leader.Prefix} {leader.NickName} {leader.LastName}
    </Typography>
  ) : (
    <Skeleton width={300} height={6} style={{ margin: 0 }} />
  )
}

export default function ExpansionPanel({ leader }) {
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <MuiExpansionPanel expanded={expanded === 'panel'} onChange={handleChange('panel')}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <LeaderName leader={leader} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table size="small">
          <TableBody>
            <TableRow name="Title" data={leader.Title} />
            <TableRow name="Spouse" data={leader.Spouse} />
            <TableRow name="Family" data={leader.Family} />
            <TableRow name="Religon" data={leader.Religon} />
            <TableRow name="Time in Office" data={leader.ElectDate} />
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </MuiExpansionPanel>
  )
}

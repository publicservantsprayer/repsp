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
import moment from 'moment'

const birthday = leader => {
  const month = leader.BirthDate
  const day = leader.BirthMonth
  if (!month || !day) return null
  return moment(`2020${month}-${day}`).format('MMMM Do')
}

const Address = ({ leader }) => {
  return (
    <>
      {leader.MailAddr1 && <div>{leader.MailAddr1}</div>}
      {leader.MailAddr2 && <div>{leader.MailAddr2}</div>}
      {leader.MailAddr3 && <div>{leader.MailAddr3}</div>}
      {leader.MailAddr5 && <div>{leader.MailAddr5}</div>}
    </>
  )
}

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
            <TableRow name="District:" data={leader.District} />
            <TableRow name="In Office Since:" value={leader.ElectDate} />
            <TableRow name="Religion:" data={leader.Religion} />
            <TableRow name="Spouse:" data={leader.Spouse} />
            <TableRow name="Family:" data={leader.Family} />
            <TableRow name="Birthday" data={birthday(leader)} />
            <TableRow name="Address:" data={<Address leader={leader} />} />
            <TableRow name="Email:" data={leader.Email} />
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </MuiExpansionPanel>
  )
}

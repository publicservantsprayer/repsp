import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import wiki from 'wikijs'
import WebIcon from '@material-ui/icons/Web'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'

import theme from '../utilities/theme'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
    boxShadow: 1,
  },
  table: {
    minWidth: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  typography: {
    padding: theme.spacing(2),
  },
})

const birthday = leader => {
  const month = leader.BirthDate
  const day = leader.BirthMonth
  if (!month || !day) return null

  return moment(`2020-${month}-${day}`).format('MMMM Do')
}

const Row = ({ field, value }) => {
  if (!value) return null
  console.log('value: ', value)

  return (
    <TableRow>
      <TableCell>{field}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  )
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

const LeaderInfo = ({ leader }) => {
  const [blurb, setBlurb] = useState()
  const classes = useStyles()

  useEffect(() => {
    wiki()
      .page(`${leader.FirstName} ${leader.LastName}`)
      .then(page => page.summary())
      .then(summary => {
        setBlurb(summary)
      })
  })

  return (
    <Box justifyContent="center">
      <div className={classes.root}>
        <Box px={2}>
          <p>{blurb}</p>
        </Box>
        <Box px={1}>
          <Paper className={classes.paper}>
            <Table className={classes.table} size="small">
              <TableBody>
                <Row field="District:" value={leader.District} />
                <Row field="In Office Since:" value={leader.DistrictID} />
                <Row field="Religon:" value={leader.Religon} />
                <Row field="Spouse:" value={leader.Spouse} />
                <Row field="Family:" value={leader.Family} />
                <Row field="Birthday" value={birthday(leader)} />
                <Row field="Address:" value={<Address leader={leader} />} />
              </TableBody>
            </Table>
          </Paper>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            href={leader.Website}
          >
            Website <WebIcon className={classes.rightIcon} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            href={leader.Facebook}
          >
            Facebook <FacebookIcon className={classes.rightIcon} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            href={leader.Twitter}
          >
            Twitter <TwitterIcon className={classes.rightIcon} />
          </Button>
        </Box>
      </div>
    </Box>
  )
}

export default LeaderInfo

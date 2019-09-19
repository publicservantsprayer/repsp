import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import wiki from 'wikijs'
import WebIcon from '@material-ui/icons/Web'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { useStateCode } from './utilities/states'
import theme from './utilities/theme'

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
})

const LeaderInfo = ({ location, leader }) => {
  const [blurb, setBlurb] = useState()
  const classes = useStyles()
  const stateCode = useStateCode(location)

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
      <Box>
        <p>{blurb}</p>
      </Box>
      <Box px={8}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Table className={classes.table} size="small">
              <TableBody>
                <TableRow>
                  <TableCell>District:</TableCell>
                  <TableCell>{leader.District}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>In Office Since:</TableCell>
                  <TableCell>{leader.DistrictID}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Religon:</TableCell>
                  <TableCell>{leader.Religon}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Spouse:</TableCell>
                  <TableCell>{leader.Spouse}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Family:</TableCell>
                  <TableCell>{leader.Family}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Birthday:</TableCell>
                  <TableCell>
                    {`${leader.BirthDate} / ${leader.BirthMonth}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Website <WebIcon className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Facebook <FacebookIcon className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Twitter <TwitterIcon className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Contact <ContactMailIcon className={classes.rightIcon} />
        </Button>
      </Box>
    </Box>
  )
}

export default LeaderInfo

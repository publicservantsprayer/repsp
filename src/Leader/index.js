import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import MuiButton from '@material-ui/core/Button'
import WebIcon from '@material-ui/icons/Web'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'

import WikiPageSummary from './WikiPageSummary'
import useSiteStyles from '../utilities/useStyles'
import DesktopContainer from '../DesktopContainer'
import useMobile from '../utilities/useMobile'
import { leaderPhoto } from '../utilities/leader'

const birthday = leader => {
  const month = leader.BirthDate
  const day = leader.BirthMonth
  if (!month || !day) return null
  return moment(`2020-${month}-${day}`).format('MMMM Do')
}

const Row = ({ field, value }) => {
  if (!value) return null

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

const Button = ({ children, href, icon }) => {
  const StartIcon = icon
  return (
    <Box m={1}>
      <MuiButton variant="contained" color="primary" href={href} startIcon={<StartIcon />}>
        {children}
      </MuiButton>
    </Box>
  )
}

export default function Leader({ leader }) {
  const classes = useSiteStyles()
  const name = `${leader.Title} ${leader.NickName} ${leader.LastName}`
  const mobile = useMobile()
  const paddingX = mobile ? 4 : 6
  const paddingTop = mobile ? 4 : 8
  const paddingBottom = mobile ? 2 : 6

  return (
    <DesktopContainer maxWidth="md">
      <Box bgcolor="common.black" px={2} pt={paddingTop} pb={paddingBottom}>
        <DesktopContainer maxWidth="sm">
          <Paper>
            <Box
              py={1}
              mb={2}
              bgcolor="primary.dark"
              color="secondary.main"
              className={classes.topBorderRadius}>
              <Typography variant="overline">{leader.Title}</Typography>
              <Typography variant="h3" component="h1" gutterBottom>
                {leader.NickName} {leader.LastName}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center">
              <Box
                m={2}
                py={2}
                px={3}
                border={0}
                bgcolor="text.primary"
                borderColor="text.secondary"
                borderRadius={2}>
                {leader.StateCode && (
                  <img src={leaderPhoto(leader)} alt={name} className={classes.borderRadius} />
                )}
              </Box>
            </Box>

            <Box px={paddingX} pt={2} pb={paddingBottom}>
              <WikiPageSummary leader={leader} />
            </Box>
          </Paper>

          <Box m={2} />

          <Box>
            <Paper>
              <Box p={2}>
                <Table size="small">
                  <TableBody>
                    <Row field="Title:" value={leader.Title} />
                    <Row field="District:" value={leader.District} />
                    <Row field="In Office Since:" value={leader.ElectDate} />
                    <Row field="Religion:" value={leader.Religion} />
                    <Row field="Spouse:" value={leader.Spouse} />
                    <Row field="Family:" value={leader.Family} />
                    <Row field="Birthday" value={birthday(leader)} />
                    <Row field="Address:" value={<Address leader={leader} />} />
                    <Row field="Email:" value={leader.Email} />
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </Box>

          <Box m={2} />

          <Box pb={paddingBottom} display="flex" justifyContent="space-around">
            <Button href={leader.Website} icon={WebIcon}>
              Website
            </Button>
            <Button href={leader.Facebook} icon={FacebookIcon}>
              Facebook
            </Button>
            <Button href={leader.Twitter} icon={TwitterIcon}>
              Twitter
            </Button>
          </Box>
        </DesktopContainer>
      </Box>
    </DesktopContainer>
  )
}

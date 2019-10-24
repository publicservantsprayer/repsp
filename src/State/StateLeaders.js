import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import { leaderPhoto, leaderUrl } from '../utilities/leader'
import { useStateCode } from '../utilities/states'
import { useFirebase } from '../firebase'
import PageTitle from '../PageTitle'
import StateFlag from './StateFlag'
import StateBlurb from './StateBlurb'
import StateCapitalPic from './StateCapitalPic'
import StateFacts from './StateFacts'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  contents: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'theme.palette.background.paper',
  },
  gridList: {
    width: 600,
    height: 500,
    cols: 5,
  },
  title: {
    backgroundColor: 'theme.palette.common.black',
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  scroll: {
    overflowY: 'scroll',
    width: '500px',
    height: '200px',
    position: 'right',
  },
})

export default () => {
  const { db } = useFirebase()
  const stateCode = useStateCode()
  const [fedSenate, setfedSenate] = React.useState()
  const [fedHouse, setfedHouse] = React.useState()
  const [stateSenate, setstateSenate] = React.useState()
  const [stateHouse, setstateHouse] = React.useState()
  const classes = useStyles()
  const [currentTab, setCurrentTab] = React.useState(0)

  const handleChange = (event, tabIndex) => setCurrentTab(tabIndex)

  const TabPanel = ({ leaders, currentTab, index }) => {
    return (
      <>
        <Typography
          component="div"
          role="tabpanel"
          hidden={currentTab !== index}
        >
          <Box
            mx={4}
            my={4}
            display="flex"
            bgcolor="common.white"
            border={15}
            borderColor="secondary.dark"
            flexGrow={1}
            justifyContent="center"
            className={classes.contents}
          >
            {leaders.map(leader => (
              <Box key={leader.PID} m={2}>
                {leader.FirstName} {leader.LastName}
                <Grid container justify="center" alignItems="center">
                  <Link component={RouterLink} to={leaderUrl(leader)}>
                    <Avatar
                      alt={leader.PhotoFile}
                      src={leaderPhoto(leader)}
                      className={classes.bigAvatar}
                    />
                  </Link>
                </Grid>
              </Box>
            ))}
          </Box>
        </Typography>
      </>
    )
  }

  React.useEffect(() => {
    const getLeaders = async () => {
      const [
        fedSenateSnap,
        fedHouseSnap,
        stateSenateSnap,
        stateHouseSnap,
      ] = await Promise.all([
        db
          .collection('states')
          .doc(stateCode)
          .collection('leaders')
          .where('LegType', '==', 'FL')
          .where('Chamber', '==', 'S')
          .get(),
        db
          .collection('states')
          .doc(stateCode)
          .collection('leaders')
          .where('LegType', '==', 'FL')
          .where('Chamber', '==', 'H')
          .get(),
        db
          .collection('states')
          .doc(stateCode)
          .collection('leaders')
          .where('LegType', '==', 'SL')
          .where('Chamber', '==', 'S')
          .get(),
        db
          .collection('states')
          .doc(stateCode)
          .collection('leaders')
          .where('LegType', '==', 'SL')
          .where('Chamber', '==', 'H')
          .get(),
      ])

      setfedSenate(fedSenateSnap.docs.map(doc => doc.data()))
      setfedHouse(fedHouseSnap.docs.map(doc => doc.data()))
      setstateSenate(stateSenateSnap.docs.map(doc => doc.data()))
      setstateHouse(stateHouseSnap.docs.map(doc => doc.data()))
    }
    getLeaders()
  }, [db, stateCode])

  if (!fedSenate) return null
  if (!fedHouse) return null
  if (!stateSenate) return null
  if (!stateHouse) return null

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="center"
        bgcolor="common.white"
        flexWrap="wrap"
      >
        <Box
          flexGrow={1}
          order={1}
          justifyContent="center"
          bgcolor="common.white"
          color="common.black"
          border={8}
          borderColor="secondary.dark"
          px={2}
          py={2}
          ml={2}
          my={6}
          mx={1}
        >
          <PageTitle
            stateCode={stateCode}
            className={classes.title}
            color="secondary"
          ></PageTitle>
          <StateFlag stateCode={stateCode} />
          <p>State Flag</p>
        </Box>
        <Box
          flexGrow={1}
          order={2}
          justifyContent="center"
          border={8}
          borderColor="secondary.dark"
          bgcolor="common.white"
          color="common.black"
          px={2}
          py={2}
          my={6}
          mx={1}
        >
          <div className={classes.scroll}>
            <h3>State Facts</h3>
            <StateFacts stateCode={stateCode} />
          </div>
        </Box>
        <Box
          flexGrow={1}
          order={3}
          justifyContent="center"
          my={6}
          px={2}
          py={2}
          mx={1}
          border={8}
          borderColor="secondary.dark"
          bgcolor="common.white"
          color="common.black"
        >
          <div className={classes.scroll}>
            <h3>State Summary</h3>
            <StateBlurb stateCode={stateCode} />
          </div>
        </Box>
        <Box
          flexGrow={1}
          order={4}
          border={8}
          justifyContent="center"
          borderColor="secondary.dark"
          bgcolor="common.white"
          color="common.black"
          pt={2}
          px={2}
          my={6}
          mr={2}
          mx={1}
        >
          <StateCapitalPic stateCode={stateCode} />
          <p>State Capital</p>
        </Box>
      </Box>

      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          variant="fullWidth"
        >
          <Tab label="Federal Senate" />
          <Tab label="Federal House" />
          <Tab label="State Senate" />
          <Tab label="State House" />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel currentTab={currentTab} index={0} leaders={fedSenate} />
        <TabPanel currentTab={currentTab} index={1} leaders={fedHouse} />
        <TabPanel currentTab={currentTab} index={2} leaders={stateSenate} />
        <TabPanel currentTab={currentTab} index={3} leaders={stateHouse} />
      </div>
    </div>
  )
}

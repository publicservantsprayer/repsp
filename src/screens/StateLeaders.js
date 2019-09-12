import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

import { leaderPhoto, leaderUrl } from '../utilities/leader'
import { withFirebase } from '../Firebase'
import PageTitle from '../PageTitle'
import StateFlag from '../StateFlag'
import StateSumDrawer from '../StateSumDrawer'

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
})

const StateLeaders = ({ match, db }) => {
  const stateCode = match.params.stateCode.toUpperCase()
  const [fedSenate, setfedSenate] = useState()
  const [fedHouse, setfedHouse] = useState()
  const [stateSenate, setstateSenate] = useState()
  const [stateHouse, setstateHouse] = useState()

  const classes = useStyles()
  const [currentTab, setCurrentTab] = React.useState(0)

  function handleChange(event, tabIndex) {
    setCurrentTab(tabIndex)
  }
  function TabPanel(props) {
    const { leaders, currentTab, index } = props
    return (
      <>
        <Typography
          component="div"
          role="tabpanel"
          hidden={currentTab !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          <Box px={20} display="flex" className={classes.contents}>
            {leaders.map(leader => (
              <Box key={leader.PID} m={2}>
                {leader.FirstName} {leader.LastName}
                <Grid container justify="center" alignItems="center">
                  <a href={leaderUrl(leader)}>
                    <Avatar
                      alt={leader.PhotoFile}
                      src={leaderPhoto(leader)}
                      className={classes.bigAvatar}
                    />
                  </a>
                </Grid>
              </Box>
            ))}
          </Box>
        </Typography>
      </>
    )
  }

  useEffect(() => {
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
      <Box mx={10} display="flex">
        <Box order={1} bgcolor="common.black" px={4} my={2}>
          <PageTitle
            stateCode={stateCode}
            className={classes.title}
            color="secondary"
          ></PageTitle>
          <StateFlag />
          <p>State Flag</p>
        </Box>
        <Box order={2} mx={3}></Box>
      </Box>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
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

export default withFirebase(StateLeaders)

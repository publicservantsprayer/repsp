import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import { Paper } from '@material-ui/core'

import { leaderPhoto, leaderUrl } from '../utilities/leader'
import useUSAState from '../utilities/useUSAState'
import { useFirebase } from '../firebase'
import StateFlag from './StateFlag'
import StateBlurb from './StateBlurb'
import StateCapitalPic from './StateCapitalPic'
import StateFacts from './StateFacts'
import useDesktop from '../utilities/useDesktop'

const useStyles = makeStyles({
  xroot: {
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
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  scroll: {
    overflowY: 'scroll',
    width: '500px',
    height: '200px',
    position: 'right',
  },
})

const Legislators = ({ children }) => {
  const desktop = useDesktop()
  if (desktop) return <Container maxWidth="lg">{children}</Container>
  return children
}

export default () => {
  const { db } = useFirebase()
  const { stateCode } = useUSAState()
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
        <Typography component="div" role="tabpanel" hidden={currentTab !== index}>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {leaders.map(leader => (
              <Box key={leader.PID} m={1}>
                <Link component={RouterLink} to={leaderUrl(leader)} underline="hover">
                  <Paper>
                    <Box p={1}>
                      <Box minWidth="145px" display="flex" justifyContent="center">
                        <Avatar
                          alt={leader.PhotoFile}
                          src={leaderPhoto(leader)}
                          className={classes.avatar}
                        />
                      </Box>
                      <Typography variant="body2" component="div" align="center" noWrap>
                        {leader.NickName} {leader.LastName}
                      </Typography>
                    </Box>
                  </Paper>
                </Link>
              </Box>
            ))}
          </Box>
        </Typography>
      </>
    )
  }

  React.useEffect(() => {
    const getLeaders = async () => {
      const leaderRef = db
        .collection('states')
        .doc(stateCode)
        .collection('leaders')
        .where('hasPhoto', '==', true)
      const [fedSenateSnap, fedHouseSnap, stateSenateSnap, stateHouseSnap] = await Promise.all([
        leaderRef
          .where('LegType', '==', 'FL')
          .where('Chamber', '==', 'S')
          .get(),
        leaderRef
          .where('LegType', '==', 'FL')
          .where('Chamber', '==', 'H')
          .get(),
        leaderRef
          .where('LegType', '==', 'SL')
          .where('Chamber', '==', 'S')
          .get(),
        leaderRef
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

  const desktop = useDesktop()
  const tabsVariant = desktop ? 'standard' : 'fullWidth'

  if (!fedSenate) return null
  if (!fedHouse) return null
  if (!stateSenate) return null
  if (!stateHouse) return null

  return (
    <div id="state-legislators">
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant={tabsVariant}
          centered>
          <Tab label="Federal Senate" />
          <Tab label="Federal House" />
          <Tab label="State Senate" />
          <Tab label="State House" />
        </Tabs>
      </AppBar>
      <Legislators>
        <Box mt={1} mb={12}>
          <TabPanel currentTab={currentTab} index={0} leaders={fedSenate} />
          <TabPanel currentTab={currentTab} index={1} leaders={fedHouse} />
          <TabPanel currentTab={currentTab} index={2} leaders={stateSenate} />
          <TabPanel currentTab={currentTab} index={3} leaders={stateHouse} />
        </Box>
      </Legislators>
    </div>
  )
}

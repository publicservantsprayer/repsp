import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { H4 } from '../utilities/formating'
import { useFirebase } from '../firebase'
import useUSAState from '../utilities/useUSAState'
import useDesktop from '../utilities/useDesktop'
import DesktopContainer from '../DesktopContainer'
import Leaders from './Leaders'

export default function StateLeaders() {
  const { db } = useFirebase()
  const { stateCode, stateName } = useUSAState()
  const [fedSenate, setfedSenate] = React.useState()
  const [fedHouse, setfedHouse] = React.useState()
  const [stateSenate, setstateSenate] = React.useState()
  const [stateHouse, setstateHouse] = React.useState()
  const [currentTab, setCurrentTab] = React.useState(0)

  const handleChange = (event, tabIndex) => setCurrentTab(tabIndex)

  const TabPanel = ({ federal, state, chamberTitle, currentTab, index }) => {
    return (
      <Typography component="div" role="tabpanel" hidden={currentTab !== index}>
        <Box px={2} pt={5}>
          <H4>
            US {chamberTitle} from {stateName}
          </H4>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="left">
          <Leaders leaders={federal} />
        </Box>
        <Box px={2} pt={5}>
          <H4>
            {stateName} State {chamberTitle}
          </H4>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="left">
          <Leaders leaders={state} />
        </Box>
      </Typography>
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
    <>
      <div id="state-legislators" style={{ position: 'relative', top: '-90px' }} />
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant={tabsVariant}
          centered>
          <Tab label="House" />
          <Tab label="Senate" />
        </Tabs>
      </AppBar>

      <DesktopContainer maxWidth="md">
        <Box mt={1} mb={12}>
          <TabPanel
            currentTab={currentTab}
            index={0}
            federal={fedHouse}
            state={stateHouse}
            chamberTitle="Representatives"
          />
          <TabPanel
            currentTab={currentTab}
            index={1}
            federal={fedSenate}
            state={stateSenate}
            chamberTitle="Senators"
          />
        </Box>
      </DesktopContainer>
    </>
  )
}

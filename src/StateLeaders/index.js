import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'

import useDesktop from '../utilities/useDesktop'
import DesktopContainer from '../DesktopContainer'
import TabPanel from './TabPanel'

export default function StateLeaders() {
  const [currentTab, setCurrentTab] = React.useState(0)

  const handleChange = (event, tabIndex) => setCurrentTab(tabIndex)

  const desktop = useDesktop()
  const tabsVariant = desktop ? 'standard' : 'fullWidth'

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
          <TabPanel chamber="H" currentTab={currentTab} index={0} />
          <TabPanel chamber="S" currentTab={currentTab} index={1} />
        </Box>
      </DesktopContainer>
    </>
  )
}

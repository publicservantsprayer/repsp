import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import Layout from '../../Layout'
import DataTable from './DataTable'
import Imports from './Imports'

function TabPanel({ children, value, index }) {
  const hidden = value !== index

  return <Box hidden={hidden}>{children}</Box>
}

function Data() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Layout>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Data" />
          <Tab label="Imports" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DataTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Imports />
      </TabPanel>
    </Layout>
  )
}
export default Data

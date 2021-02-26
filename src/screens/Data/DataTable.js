import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useFirebase, useSiteConfig } from '../../utilities/firebase'
import moment from 'moment'
import statesObj from '../../utilities/statesObj'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

// const dateID = moment().format('YYYY-MM-DD')

const formatTimestamp = timestamp => {
  if (!timestamp) return 'none'
  return moment.unix(timestamp.seconds).format('YYYY-MM-DD')
}

const useData = () => {
  const { db } = useFirebase()
  const [rows, setRows] = React.useState([])
  const [siteConfig, loadingSiteConfig] = useSiteConfig()

  const handleGetData = React.useCallback(
    stateCode => async () => {
      if (loadingSiteConfig) return

      // const leadersRef = db
      //   .collection('states')
      //   .doc(stateCode)
      //   .collection('leaders')
      //   .orderBy('lastImportDate')

      const leadersRef = db
        .collection('states')
        .doc(stateCode)
        .collection('leaders')
        //.where('lastImportDate', '>', siteConfig.lastImportDate)
        .where('hasPhoto', '==', true)
        .orderBy('lastImportDate')
        .orderBy('LastName')
        .orderBy('PID')

      console.log('getting leaders')
      const leaders = await leadersRef.get()
      // console.log(leaders)
      setRows([])
      setRows(leaders.docs.map(d => d.data()))
    },
    [loadingSiteConfig, siteConfig]
  )

  return { rows, handleGetData }
}

function DataTable() {
  const [siteConfig] = useSiteConfig()
  const siteLastImportDate = moment.unix(siteConfig?.lastImportDate.seconds)

  const { rows, handleGetData } = useData()

  const current = row => {
    const leaderLastImportDate = moment.unix(row.lastImportDate.seconds)

    return leaderLastImportDate.isAfter(siteLastImportDate)
  }

  return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
        {Object.keys(statesObj).map((stateCode, i) => (
          <Box key={i}>
            <StateButton
              stateCode={stateCode}
              stateName={statesObj[stateCode]}
              handleGetData={handleGetData}
            />
          </Box>
        ))}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>lastImportDate</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">has photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  <div style={current(row) ? {} : { textDecoration: 'line-through', color: 'red' }}>
                    {formatTimestamp(row.lastImportDate)}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Link component={RouterLink} to={`/leader/${row.permaLink}`}>
                    {row.LegalName}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.State}</TableCell>
                <TableCell align="right">{row.hasPhoto ? 'yes' : 'no'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function StateButton({ stateCode, stateName, handleGetData }) {
  return (
    <Box margin={1} flex={1}>
      <button onClick={handleGetData(stateCode)}>{stateName}</button>
    </Box>
  )
}

export default DataTable

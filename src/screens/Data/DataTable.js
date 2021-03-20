import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
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
  const [allRows, setAllRows] = React.useState([])
  const [currentRows, setCurrentRows] = React.useState([])

  const handleGetData = React.useCallback(
    stateCode => async () => {
      const leadersRef = db.collection('states').doc(stateCode).collection('leaders').orderBy('PID')
      const currentLeaders = await leadersRef.get()
      setCurrentRows(currentLeaders.docs.map(d => d.data()))

      const allLeaderRef = db
        .collection('leaders')
        .where('StateCode', '==', stateCode)
        .orderBy('lastImportDate', 'desc')
        .orderBy('PID')
      const allLeaders = await allLeaderRef.get()
      setAllRows(allLeaders.docs.map(d => d.data()))
    },
    [db]
  )

  return { allRows, currentRows, handleGetData }
}

function DataTable() {
  const { allRows, currentRows, handleGetData } = useData()

  return (
    <Box>
      <StateNavigation handleGetData={handleGetData} />
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <HalfTable rows={allRows} />
        <HalfTable rows={currentRows} />
      </Box>
    </Box>
  )
}

function StateNavigation({ handleGetData }) {
  return (
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
  )
}

function HalfTable({ rows }) {
  return (
    <Box>
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
                  {formatTimestamp(row.lastImportDate)} - {row.lastImportDate.seconds}
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
    </Box>
  )
}

function StateButton({ stateCode, stateName, handleGetData }) {
  return (
    <Box margin={1} flex={1}>
      <Button onClick={handleGetData(stateCode)}>{stateName}</Button>
    </Box>
  )
}

export default DataTable

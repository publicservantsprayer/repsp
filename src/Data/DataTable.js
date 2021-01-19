import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useFirebase } from '../utilities/firebase'
import moment from 'moment'

const dateID = moment().format('YYYY-MM-DD')
const previousDayID = dateID => moment(dateID).subtract(1, 'day').format('YYYY-MM-DD')

const formatTimestamp = timestamp => {
  if (!timestamp) return 'none'
  return moment.unix(timestamp.seconds).format('YYYY-MM-DD')
}

const useData = () => {
  const stateCode = 'IN'
  const { db } = useFirebase()
  const [rows, setRows] = React.useState([])

  const leadersRef = db.collection('states').doc(stateCode).collection('leaders')
  //.where('lastImportDate', '==', null)
  // .where('lastImportDate', '>', new Date('2010-08-15'))
  //.where('hasPhoto', '==', true)
  //.orderBy('lastImportDate')
  //.orderBy('LastName')
  //.orderBy('PID')
  // const postsRef = db.collection('states').doc(stateCode).collection('posts')

  const handleGetData = async () => {
    console.log('getting leaders')
    const leaders = await leadersRef.get()
    // console.log(leaders)
    setRows(leaders.docs.map(d => d.data()))
    //   const previousPost = await postsRef.doc(previousDayID(dateID)).get()
    //   console.log(previousPost)

    //   const firstThree = await leadersRef.limit(3).get()
    //   console.log(firstThree)

    //   let docs = firstThree.docs

    //   if (previousPost.exists) {
    //     const lastLeader = previousPost.data().leader3
    //     console.log({ lastLeader })
    //     const nextThree = await leadersRef
    //       .startAfter(lastLeader.LastName, lastLeader.PID)
    //       .limit(3)
    //       .get()
    //     console.log({ nextThree })
    //     // Add on the first three in case we need to wrap
    //     docs = nextThree.docs.concat(docs)
    //   }

    //   console.log({ dateID, docs, postsRef })
  }

  return { rows, handleGetData }
}

function DataTable() {
  const { rows, handleGetData } = useData()
  console.log(rows)

  return (
    <>
      <button onClick={handleGetData}>get data</button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>lastImportDate</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">link</TableCell>
              <TableCell align="right">has photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.PID}>
                <TableCell component="th" scope="row">
                  {formatTimestamp(row.lastImportDate)}
                </TableCell>
                <TableCell align="right">{row.LegalName}</TableCell>
                <TableCell align="right">{row.permaLink}</TableCell>
                <TableCell align="right">{row.hasPhoto ? 'yes' : 'no'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default DataTable

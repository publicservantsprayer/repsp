import React from 'react'

import Layout from '../../../Layout'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { useFirebase } from '../../../utilities/firebase'
import { useParams } from 'react-router-dom'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import moment from 'moment'

const useDataImport = dataImportId => {
  const { db } = useFirebase()

  const [dataImport, loading, error] = useDocumentData(
    db.collection('/dataImports').doc(dataImportId),
    {
      idField: 'docId',
    }
  )
  if (error) console.log('Error getting content item: ', dataImportId, error)

  return [dataImport, loading, error]
}

const useImportLogs = dataImportId => {
  const { db } = useFirebase()

  const [stateImportLogs, stateLoading, stateError] = useCollectionData(
    db
      .collection('/dataImports')
      .doc(dataImportId)
      .collection('importLog')
      .where('legislatorType', '==', 'state')
      .orderBy('timestamp'),
    {
      idField: 'docId',
    }
  )

  const [federalImportLogs, federalLoading, federalError] = useCollectionData(
    db
      .collection('/dataImports')
      .doc(dataImportId)
      .collection('importLog')
      .where('legislatorType', '==', 'federal')
      .orderBy('timestamp'),
    {
      idField: 'docId',
    }
  )

  React.useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db
        .collection('/dataImports')
        .doc(dataImportId)
        .collection('importLog')
        .where('legislatorType', '==', 'federal')
        .orderBy('timestamp')
        .get()
      console.log(snapshot)
    }
    fetchData()
  }, [dataImportId, db])

  return {
    stateImportLogs,
    federalImportLogs,
    stateLoading,
    stateError,
    federalLoading,
    federalError,
  }
}

export default function DataImportDetails() {
  const [importStarted] = React.useState(false)
  const { dataImportId } = useParams()
  const [dataImport] = useDataImport(dataImportId)
  const { stateImportLogs, federalImportLogs } = useImportLogs(dataImportId)

  if (!dataImport)
    return (
      <Layout>
        <h1>Waiting for data</h1>
      </Layout>
    )

  return (
    <Layout>
      <Box margin={2}>
        <h1>
          Data Import from{' '}
          {moment.unix(dataImport?.date?.seconds).format('dddd, MMMM Do [at] h:mm:ss a')}
        </h1>
        <Box>
          <h2>Federal</h2>
          <Link href={dataImport.federalMembersUrl}>{dataImport.federalMembersUrl}</Link>
        </Box>
        <Box>
          <h2>State</h2>
          <Link href={dataImport.stateMembersUrl}>{dataImport.stateMembersUrl}</Link>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box width="49%">
            <h2>State Import logs:</h2>
            <Box height={400} border="1px solid white" overflow="auto" display="block">
              <ul>
                {importStarted && <li>Import started...</li>}
                {stateImportLogs &&
                  stateImportLogs.reverse().map((log, i) => (
                    <li key={i}>
                      {log.legislatorType}: {log.message}
                    </li>
                  ))}
              </ul>
            </Box>
          </Box>
          <Box width="49%">
            <h2>Federal Import logs:</h2>
            <Box height={400} border="1px solid white" overflow="auto" display="block">
              <ul>
                {importStarted && <li>Import started...</li>}
                {federalImportLogs &&
                  federalImportLogs.reverse().map((log, i) => (
                    <li key={i}>
                      {log.legislatorType}: {log.message}
                    </li>
                  ))}
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

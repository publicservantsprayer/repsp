import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { ImportForm } from './ImportForm'
import { useDataImports, useFirebase } from '../../../utilities/firebase'
import moment from 'moment'
import Modal from '@material-ui/core/Modal'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useSnackbar } from 'notistack'

function Imports() {
  const [showForm, setShowForm] = React.useState(false)
  const [dataImports] = useDataImports()

  const handleClick = () => {
    setShowForm(show => !show)
  }

  const closeForm = () => {
    setShowForm(false)
  }

  return (
    <Box margin={2}>
      <Button variant="outlined" onClick={handleClick} disabled={false}>
        Create New Import
      </Button>

      <Modal open={showForm}>
        <Box position="absolute" width={400} top="25%" left="25%" padding={4}>
          <ImportForm closeForm={closeForm} />
        </Box>
      </Modal>

      <Box margin={4}>
        {dataImports?.map((dataImport, key) => (
          <Import key={key} dataImport={dataImport} />
        ))}
      </Box>
    </Box>
  )
}

function Import({ dataImport }) {
  const { db } = useFirebase()
  const { enqueueSnackbar } = useSnackbar()

  const handleSetNewLastImportDate = async () => {
    await db
      .collection('siteConfig')
      .doc('current')
      .set({ lastImportDate: dataImport.date }, { merge: true })
    enqueueSnackbar('Updated last import date', { variant: 'info' })
  }

  return (
    <Box color="white" margin={3} display="flex">
      <Link to={`/data/imports/${dataImport.docId}`} component={RouterLink}>
        Data import from{' '}
        {moment.unix(dataImport?.date?.seconds).format('YYYY - dddd, MMMM Do [at] h:mm:ss a')}
      </Link>

      <Box margin={1}>
        <Button variant="contained" onClick={handleSetNewLastImportDate}>
          Use this last import date
        </Button>
      </Box>
    </Box>
  )
}

export default Imports

import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { ImportForm } from './ImportForm'
import { useDataImports } from '../utilities/firebase'
import moment from 'moment'

function Import({ dataImport }) {
  return <Box>{moment.unix(dataImport?.date?.seconds).format('dddd, MMMM Do [at] h:mm:ss a')}</Box>
}

function Imports() {
  const [showForm, setShowForm] = React.useState()
  const [dataImports, loading] = useDataImports()

  const handleClick = () => {
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
  }
  return (
    <Box margin={2}>
      <Button variant="outlined" onClick={handleClick} disabled={showForm}>
        Create New Import
      </Button>
      {showForm && <ImportForm handleCancel={handleCancel} />}
      <Box>
        {dataImports?.map((dataImport, key) => (
          <Import key={key} dataImport={dataImport} />
        ))}
      </Box>
    </Box>
  )
}

export default Imports

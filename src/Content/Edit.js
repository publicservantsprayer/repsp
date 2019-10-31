import React from 'react'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'

import { useContentItem } from '../firebase'
import Form from './Form'
import { H1 } from '../utilities/formating'

export default () => {
  const params = useParams()
  const [docValues, loading, error] = useContentItem(params.docId)

  return (
    <Box>
      <H1>Edit Content</H1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Content: Loading...</span>}
      {docValues && <Form docValues={docValues} />}
    </Box>
  )
}

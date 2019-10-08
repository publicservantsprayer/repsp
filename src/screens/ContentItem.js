import React from 'react'
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'

import Markdown from '../Markdown'
import { useContentItem, useAdmin } from '../firebase'
import UpdateButtons from '../Content/UpdateButtons'

export default ({ docId, children }) => {
  const params = useParams()
  if (!docId) docId = params.docId
  const [doc, loading] = useContentItem(docId)
  const [admin] = useAdmin()

  return (
    <Box flexGrow={1}>
      {loading && <p>Loading...</p>}
      {doc && (
        <Box p={1}>
          <h2>{doc.title}</h2>
          <hr />
          <Markdown>{doc.content}</Markdown>
          {admin && <UpdateButtons content={doc} />}
        </Box>
      )}
      {children}
    </Box>
  )
}

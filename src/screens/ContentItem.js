import React from 'react'
import Box from '@material-ui/core/Box'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useParams } from 'react-router-dom'

import Markdown from '../Markdown'
import { useContentItem, useAdmin } from '../firebase'

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
        </Box>
      )}
      {admin && <Link component={RouterLink} to={`/content/edit/${doc.docId}`}>Edit this content</Link>}
      {children}
    </Box>
  )
}

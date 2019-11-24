import React from 'react'
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'

import Markdown from '../Markdown'
import { useContentItem, useAdmin } from '../utilities/firebase'
import UpdateButtons from '../Content/UpdateButtons'
import Layout from '../Layout'
import LayoutContent from '../Layout/Content'
import Title from '../Layout/Title'

export default function ContentItem({ docId, children }) {
  const params = useParams()
  if (!docId) docId = params.docId
  const [doc, loading] = useContentItem(docId)
  const [admin] = useAdmin()

  return (
    <Layout>
      <LayoutContent>
        {loading && <p>Loading...</p>}
        {doc && (
          <>
            <Title>{doc.title}</Title>
            <Box>
              <Markdown>{doc.content}</Markdown>
              {admin && <UpdateButtons content={doc} />}
              {children}
            </Box>
          </>
        )}
      </LayoutContent>
    </Layout>
  )
}

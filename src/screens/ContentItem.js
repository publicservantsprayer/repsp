import React from 'react'
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'
import { Divider } from '@material-ui/core'

import Markdown from '../Markdown'
import { useContentItem, useAdmin } from '../firebase'
import UpdateButtons from '../Content/UpdateButtons'
import Screen from '../Screen'
import ScreenContent from '../Screen/Content'
import ScreenTitle from '../Screen/Title'

export default ({ docId, children }) => {
  const params = useParams()
  if (!docId) docId = params.docId
  const [doc, loading] = useContentItem(docId)
  const [admin] = useAdmin()

  return (
    <Screen>
      <ScreenContent>
        {loading && <p>Loading...</p>}
        {doc && (
          <>
            <ScreenTitle>{doc.title}</ScreenTitle>
            <Box mt={2} mb={4}>
              <Divider />
            </Box>
            <Box>
              <Markdown>{doc.content}</Markdown>
              {admin && <UpdateButtons content={doc} />}
              {children}
            </Box>
          </>
        )}
      </ScreenContent>
    </Screen>
  )
}

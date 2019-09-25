import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import { withFirebase } from '../Firebase'
import Form from './Form'
import { H1 } from '../utilities/formating'
import Markdown from '../Markdown'

export default withFirebase(({ db, docId, showList, handleCancelEdit }) => {
  const [docValues, loading, error] = useDocumentData(
    db.collection('content').doc(docId)
  )

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Content: Loading...</span>}
      {docValues && <>
        <Form docValues={docValues} showList={showList} handleCancel={handleCancelEdit} showDelete />

        <Box m={2}>
          <Paper>
            <Container>
              <H1>{docValues.title}</H1>
              <Markdown>
                {docValues.content}
              </Markdown>
            </Container>
          </Paper>
        </Box>
      </>
      }
    </>
  )
})


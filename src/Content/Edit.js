import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'

import { withFirebase } from '../Firebase'
import Form from './Form'

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
      </>
      }
    </>
  )
})


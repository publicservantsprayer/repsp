import React from 'react'
import Form from './Form'
import { withFirebase } from '../Firebase'

export default withFirebase(({ firebase, handleCancelNew, showList }) => {
  const defaultValues = {
    docId: '',
    title: '',
    cardImage: '',
    blurb: '',
    content: '',
    category: '',
    images: [],
    createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
  }

  return (
    <Form
      handleCancel={handleCancelNew}
      docValues={defaultValues}
      showList={showList}
    />
  )
})

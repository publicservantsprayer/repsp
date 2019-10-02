import React from 'react'
import Form from './Form'
import { useFirebase } from '../firebase'

export default ({ handleCancelNew, showList }) => {
  const { firebase } = useFirebase()
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
}

import React from 'react'
import Box from '@material-ui/core/Box'

import { useFirebase } from '../utilities/firebase'
import { H1 } from '../utilities/formating'
import Form from './Form'

export default function New() {
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
    <Box>
      <H1>New Content</H1>
      <Form docValues={defaultValues} isNew />
    </Box>
  )
}

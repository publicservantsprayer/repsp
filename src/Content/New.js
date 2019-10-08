import React from 'react'
import Form from './Form'
import { useFirebase } from '../firebase'
import { H1 } from '../utilities/formating'
import Box from '@material-ui/core/Box'

export default () => {
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

  return <Box><H1>New Content</H1><Form docValues={defaultValues} isNew /></Box>
}

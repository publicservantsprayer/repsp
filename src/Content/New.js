import React from 'react'

import { useFirebase } from '../utilities/firebase'
import Layout from '../Layout'
import LayoutContent from '../Layout/Content'
import Title from '../Layout/Title'
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
    <Layout>
      <LayoutContent>
        <Title>New Content</Title>
        <Form docValues={defaultValues} isNew />
      </LayoutContent>
    </Layout>
  )
}

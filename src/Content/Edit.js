import React from 'react'
import { useParams } from 'react-router-dom'

import { useContentItem } from '../utilities/firebase'
import Layout from '../Layout'
import LayoutContent from '../Layout/Content'
import Title from '../Layout/Title'
import Form from './Form'

export default function Edit() {
  const params = useParams()
  const [docValues] = useContentItem(params.docId)

  return (
    <Layout>
      <LayoutContent>
        <Title>Edit Content</Title>
        {docValues && <Form docValues={docValues} />}
      </LayoutContent>
    </Layout>
  )
}

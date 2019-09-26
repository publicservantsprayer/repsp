import React from 'react'
import Form from './Form'

export default ({ handleCancelNew, showList }) => {
  const defaultValues = {
    docId: '',
    title: '',
    cardImage: '',
    blurb: '',
    content: '',
    category: '',
    images: [],
  }

  return (
    <Form
      handleCancel={handleCancelNew}
      docValues={defaultValues}
      showList={showList}
    />
  )
}

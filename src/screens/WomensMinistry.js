import React, { useState, useEffect } from 'react'
import Link from '@material-ui/core/Link'

import { withFirebase } from '../Firebase'
import Markdown from '../Markdown'

const WomensMinistry = ({ db }) => {
  const [article, setArticle] = useState()

  useEffect(() => {
    ; (async () => {
      const doc = await db
        .collection('/states/AK/articles')
        .doc('why-we-pray-in-depth-part-1')
        .get()
      console.log('got it!', doc.data())
      setArticle(doc.data())
    })()
  }, [db])

  if (!article) return null

  return (
    <>
      <div>
        <Link to="https://youtu.be/ja2zlR1hT5U">Women's Ministry Video</Link>
      </div>
      <h2>{article.title}</h2>
      <Markdown>{article.content}</Markdown>
    </>
  )
}

export default withFirebase(WomensMinistry)

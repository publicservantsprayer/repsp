import React, { useState, useEffect } from 'react'
import PageTitle from '../PageTitle'
import Leader from '../Leader'
import { withFirebase } from '../Firebase'
import moment from 'moment'


const StateHome = ({ match, db }) => {
  const stateCode = match.params.stateCode.toUpperCase()
  const [post, setPost] = useState({})

  useEffect(() => {
    (async () => {
      const snap = await db.collection(`/states/${stateCode}/posts/`).orderBy('dateID', 'desc').limit(1).get()
      console.log('getting leader data')
      setPost(snap.docs[0].data())
    })()
  }, [db, stateCode])

  return (
    <div>
      <PageTitle stateCode={stateCode} />
      {post.dateID &&
        <div>
          <h3>{moment(post.dateID).format('dddd, MMMM Do, YYYY')}</h3>
          <h2>Today we are praying for</h2>
          <Leader leader={post.leader1} />
          <Leader leader={post.leader2} />
          <Leader leader={post.leader3} />
        </div>
      }
    </div>
  )
}

export default withFirebase(StateHome)

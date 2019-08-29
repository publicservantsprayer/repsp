import React, { useState, useEffect } from 'react'
import PageTitle from '../PageTitle'
import Leader from '../Leader'
import { withFirebase } from '../Firebase'


const StateLeader = ({ match, db }) => {
  const id = match.params.id
  const stateCode = match.params.stateCode.toUpperCase()
  const [leader, setLeader] = useState()

  useEffect(() => {
    (async () => {
      const doc = await db.collection('states').doc(stateCode).collection('leaders').doc(id).get()
      console.log('getting leader data')
      setLeader(doc.data())
    })()
  }, [db, id, stateCode])

  return (
    <div>
      <PageTitle stateCode={stateCode} />
      {leader &&
        <div>
          <Leader leader={leader} />
        </div>
      }
    </div>
  )
}

export default withFirebase(StateLeader)

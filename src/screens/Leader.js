import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Leader from '../Leader'
import { withFirebase } from '../Firebase'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
})

const StateLeader = ({ match, db }) => {
  const id = match.params.id
  const [leader, setLeader] = useState()
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      const snapshot = await db
        .collectionGroup('leaders')
        .where('permaLink', '==', id)
        .get()
      setLeader(snapshot.docs[0].data())
      console.log('leader doc:', snapshot.docs[0].data())
    })()
  }, [db, id])

  if (!leader) return null

  return (
    <div className={classes.root}>{leader && <Leader leader={leader} />}</div>
  )
}

export default withFirebase(StateLeader)

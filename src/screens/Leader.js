import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Leader from '../Leader'
import { useFirebase } from '../firebase'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
})

export default () => {
  const params = useParams()
  const { db } = useFirebase()
  const [leader, setLeader] = React.useState()
  const classes = useStyles()

  React.useEffect(() => {
    ; (async () => {
      const snapshot = await db
        .collectionGroup('leaders')
        .where('permaLink', '==', params.id)
        .get()
      setLeader(snapshot.docs[0].data())
      console.log('leader doc:', snapshot.docs[0].data())
    })()
  }, [db, params])

  if (!leader) return null

  return (
    <div className={classes.root}>{leader && <Leader leader={leader} />}</div>
  )
}

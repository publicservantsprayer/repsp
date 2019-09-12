import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import PageTitle from '../PageTitle'
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
  const stateCode = match.params.stateCode.toUpperCase()
  const [leader, setLeader] = useState()
  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      const doc = await db
        .collection('states')
        .doc(stateCode)
        .collection('leaders')
        .doc(id)
        .get()
      setLeader(doc.data())
    })()
  }, [db, id, stateCode])

  return (
    <div className={classes.root}>
      <Box bgcolor="common.black">
        <PageTitle stateCode={stateCode} />
      </Box>
      {leader && (
        <div>
          <Leader leader={leader} />
        </div>
      )}
    </div>
  )
}

export default withFirebase(StateLeader)

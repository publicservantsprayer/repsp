import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import PageTitle from '../PageTitle'
import Leader from '../Leader'
import { withFirebase } from '../Firebase'
import LeaderInfo from '../LeaderInfo'

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
        <Box mx={50} px={5} py={2} bgcolor="primary.dark">
          <Leader leader={leader} />
          <LeaderInfo leader={leader} />
        </Box>
      )}
    </div>
  )
}

export default withFirebase(StateLeader)

import React from 'react'

import { withFirebase } from '../Firebase'
import PageTitle from '../PageTitle'

const StateLeaders = ({ match, db }) => {
  const stateCode = match.params.stateCode.toUpperCase()

  return (
    <div>
      <PageTitle stateCode={stateCode} />

    </div>
  )
}
export default withFirebase(StateLeaders)

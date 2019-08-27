import React, { useState, useEffect } from 'react'

import { withFirebase } from '../Firebase'
import PageTitle from '../PageTitle'
import Chamber from '../Chamber'

const StateLeaders = ({ match, db }) => {
  const stateCode = match.params.stateCode.toUpperCase()
  const [fedSenate, setfedSenate] = useState()
  const [fedHouse, setfedHouse] = useState()
  const [stateSenate, setstateSenate] = useState()
  const [stateHouse, setstateHouse] = useState()

  useEffect(() => {
    const getLeaders = async () => {
      const [fedSenateSnap, fedHouseSnap, stateSenateSnap, stateHouseSnap] = await Promise.all([
        db.collection('states').doc(stateCode).collection('leaders').where('LegType', '==', 'FL').where('Chamber', '==', 'S').get(),
        db.collection('states').doc(stateCode).collection('leaders').where('LegType', '==', 'FL').where('Chamber', '==', 'H').get(),
        db.collection('states').doc(stateCode).collection('leaders').where('LegType', '==', 'SL').where('Chamber', '==', 'S').get(),
        db.collection('states').doc(stateCode).collection('leaders').where('LegType', '==', 'SL').where('Chamber', '==', 'H').get(),
      ])
      setfedSenate(fedSenateSnap.docs)
      setfedHouse(fedHouseSnap.docs)
      setstateSenate(stateSenateSnap.docs)
      setstateHouse(stateHouseSnap.docs)
    }
    getLeaders()
  })

  if (!fedSenate) return null
  if (!fedHouse) return null
  if (!stateSenate) return null
  if (!stateHouse) return null

  return (
    <div>
      <PageTitle stateCode={stateCode} />

      <Chamber title="Federal Senate" leaders={fedSenate} />
      <Chamber title="Federal House" leaders={fedHouse} />
      <Chamber title="State House" leaders={stateSenate} />
      <Chamber title="State Senate" leaders={stateHouse} />

    </div>
  )
}
export default withFirebase(StateLeaders)

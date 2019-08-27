import React from 'react'
import { statesObj } from './utilities/states'

const PageTitle = props => {
  const stateName = statesObj[props.stateCode]

  return (
    <h1>{stateName}</h1>
  )
}

export default PageTitle

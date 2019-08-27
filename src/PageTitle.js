import React from 'react'
import { statesObj } from './utilities/states'

const PageTitle = props => <h1>{statesObj[props.stateCode]}</h1>

export default PageTitle

import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

import useUSAState from '../utilities/useUSAState'
import stateFacts from '../utilities/stateFacts'

const FactLI = ({ fact, children }) => {
  const { stateCode } = useUSAState()
  const info = stateFacts(stateCode)
  if (!info[fact]) return null

  let data = info[fact]
  if (fact === 'website') {
    const url = `http://${data}`
    data = <Link href={url}>{data}</Link>
  }
  return (
    <li>
      {children} {data}
    </li>
  )
}

const StateFacts = () => {
  const preventDefault = event => event.preventDefault()

  return (
    <Box>
      <FactLI fact="capitol">State Capital: </FactLI>
      <FactLI fact="motto">State Motto: </FactLI>
      <FactLI fact="nickname">State Nickname: </FactLI>
      <FactLI fact="governor">Governor: </FactLI>
      <FactLI fact="lieutenantGovernor">Lieutenant Governor: </FactLI>
      <FactLI fact="senateProTem">Senate Pro Tem: </FactLI>
      <FactLI fact="houseSpeaker">House Speaker: </FactLI>
      <FactLI fact="speakerOfTheHouse">House Speaker: </FactLI>
      <FactLI fact="presidentOfTheSenate">President of the Senate: </FactLI>
      <FactLI fact="2010Pop">Population: </FactLI>
      <FactLI fact="populationRank">Population Rank: </FactLI>
      <FactLI fact="largestCity">Largest City: </FactLI>
      <FactLI fact="website">State Website:</FactLI>
    </Box>
  )
}

export default StateFacts

import stateFactsData from './stateFactsData'

const stateFacts = stateCode => {
  const stateFacts = stateFactsData[stateCode]
  const obj = {}
  let facts = Object.keys(stateFacts).forEach(key => {
    let fact = stateFacts[key]
    if (fact === 'nowrap') return
    if (Array.isArray(fact)) fact = fact[0]
    obj[key] = fact
  })
  return obj
}

export default stateFacts

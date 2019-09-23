import stateFactsData from './stateFactsData'

const stateFacts = stateCode => {
  const stateFactsObj = stateFactsData[stateCode]
  const obj = {}
  Object.keys(stateFactsObj).forEach(key => {
    let fact = stateFactsObj[key]
    if (fact === 'nowrap') return
    if (Array.isArray(fact)) fact = fact[0]
    obj[key] = fact
  })
  return obj
}

export default stateFacts

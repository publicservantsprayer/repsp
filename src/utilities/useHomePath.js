import useState from './useUSAState'

export default () => {
  const { stateCode } = useState()

  if (stateCode) return `/states/${stateCode.toLowerCase()}`
  else return '/'
}

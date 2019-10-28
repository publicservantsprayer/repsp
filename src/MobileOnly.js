import useMobile from './utilities/useMobile'

export default ({ children }) => {
  const mobile = useMobile()

  return mobile ? children : null
}

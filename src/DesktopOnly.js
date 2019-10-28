import useDesktop from './utilities/useDesktop'

export default ({ children }) => {
  const desktop = useDesktop()

  return desktop ? children : null
}

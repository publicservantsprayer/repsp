import useDesktop from './utilities/useDesktop'

export default function DesktopOnly({ children }) {
  const desktop = useDesktop()

  return desktop ? children : null
}

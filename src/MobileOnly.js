import useMobile from './utilities/useMobile'

export default function MobileOnly({ children }) {
  const mobile = useMobile()

  return mobile ? children : null
}

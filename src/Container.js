import React from 'react'
import Container from '@material-ui/core/Container'

import useDesktop from './utilities/useDesktop'

export default ({ children, maxWidth }) => {
  const desktop = useDesktop()

  if (!desktop) return children
  return <Container maxWidth={maxWidth}>{children}</Container>
}

import React from 'react'
import Container from '@material-ui/core/Container'

import useMobile from './utilities/useMobile'

export default function DesktopContainer({ children, maxWidth }) {
  const mobile = useMobile()

  if (mobile) return children

  return <Container maxWidth={maxWidth}>{children}</Container>
}

import React from 'react'

import Container from '@material-ui/core/Container'
import Map from '../SVGMap'
import Articles from './Articles'

const USMap = () => {
  return (
    <>
      <Container>
        <h1>Find Your State</h1>
      </Container>
      <Map />
      <Articles />
    </>
  )
}
export default USMap

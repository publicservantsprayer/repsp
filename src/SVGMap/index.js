import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import SVGMapPaths from './SVGMapPaths'
import { stateCodes } from '../utilities/states'

const SVGMap = () => {
  const [to, setTo] = useState()
  const stateColor = '#88a4bc'
  const stateHighlight = '#223E56'
  const [highlight, set] = useSpring(() => ({ color: stateColor }))

  const addEvents = (element, target, to) => {
    element.addEventListener('click', event => {
      setTo(to)
    })
    element.addEventListener('mouseover', event => {
      target.style.fill = stateHighlight
    })
    element.addEventListener('mouseout', event => {
      target.style.fill = stateColor
    })
  }

  useEffect(() => {
    stateCodes.forEach(stateCode => {
      const to = `/states/${stateCode}`
      const mapState = document.querySelector(`.map-state-${stateCode}`)
      const mapText = document.querySelector(`.map-label-${stateCode}`)
      const mapLabel = document.querySelector(`.map-rect-${stateCode}`)
      addEvents(mapState, mapState, to)
      addEvents(mapText, mapState, to)
      if (mapLabel) {
        addEvents(mapLabel, mapLabel, to)
        addEvents(mapLabel, mapState, to)
        addEvents(mapText, mapState, to)
        addEvents(mapText, mapLabel, to)
        addEvents(mapState, mapLabel, to)
      }
    })
  }, [])
  if (to) {
    return <Redirect to={to} push="true" />
  }

  return (
    <div>
      <svg height="431.2" version="1.1" width="700" xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'hidden', position: 'relative' }} viewBox="-14 -7 700 431.2" preserveAspectRatio="xMinYMin">
        <SVGMapPaths />
      </svg>
    </div >
  )
}

export default SVGMap

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import { useSpring, animated } from 'react-spring'
import { stateCodes } from '../utilities/states'
import statePaths from './statePaths'
import theme from '../utilities/theme'

console.log(theme)

const stateColor = theme.palette.secondary.dark
const stateColorOver = theme.palette.primary.main
const stateLine = theme.palette.secondary.light

const useStyles = makeStyles({
  path: {
    fill: stateColor,
    stroke: stateLine,
    opacity: 1,
    cursor: 'pointer',
    strokeWidth: 2,
    transform: 'matrix(0.7, 0, 0, 0.7, 0, 0)',
  }
})


const addAllEvents = (stateCode, setTo, setStyle) => {
  const addEvents = (element, target, to, setStyle) => {
    element.addEventListener('click', event => {
      setTo(to)
    })
    element.addEventListener('mouseover', event => {
      if (setStyle) setStyle({ fill: stateColorOver })
    })
    element.addEventListener('mouseout', event => {
      if (setStyle) setStyle({ fill: stateColor })
    })
  }

  const to = `/states/${stateCode}`
  const mapPath = document.querySelector(`.map-path-${stateCode}`)
  const mapText = document.querySelector(`.map-text-${stateCode}`)
  const mapRect = document.querySelector(`.map-rect-${stateCode}`)

  addEvents(mapPath, mapPath, to, setStyle)
  addEvents(mapText, mapPath, to, setStyle)

  if (mapRect) {
    addEvents(mapRect, mapRect, to, setStyle)
    addEvents(mapRect, mapPath, to, setStyle)
    addEvents(mapText, mapRect, to, setStyle)
    addEvents(mapPath, mapRect, to, setStyle)
  }
}

const springConfig = { mass: 1, tension: 170, friction: 26 }

const SVGMapPath = ({ stateCode }) => {
  const classes = useStyles()
  const [to, setTo] = useState()
  const [style, setStyle] = useSpring(() => ({ fill: stateColor, config: springConfig }))
  const className = `${classes.path} map-path-${stateCode}`
  const d = statePaths[stateCode].d

  useEffect(() => addAllEvents(stateCode, setTo, setStyle), [setStyle, stateCode])

  if (to) return <Redirect to={to} push={true} />

  return <animated.path d={d} style={style} className={className} />
}

const SVGMapRect = ({ stateCode }) => {
  const className = `map-rect map-rect-${stateCode}`
  const x = statePaths[stateCode].rectX
  const y = statePaths[stateCode].rectY
  const transform = statePaths[stateCode].rectTransform
  const [to, setTo] = useState()
  const [style, setStyle] = useSpring(() => ({ fill: stateColor, config: springConfig }))

  useEffect(() => addAllEvents(stateCode, setTo, setStyle), [setStyle, stateCode])

  if (to) return <Redirect to={to} push={true} />
  if (!statePaths[stateCode].hasLabel) return null

  return <animated.rect
    width="45" height="28" r="6" rx="6" ry="6"
    className={className} x={x} y={y} style={style} transform={transform} />
}

const SVGMapText = ({ stateCode }) => {
  const className = `map-text map-text-${stateCode}`
  const x = statePaths[stateCode].textX
  const y = statePaths[stateCode].textY
  const transform = statePaths[stateCode].textTransform
  const [to, setTo] = useState()

  useEffect(() => addAllEvents(stateCode, setTo), [stateCode])

  if (to) return <Redirect to={to} push={true} />

  return (
    <text className={className} x={x} y={y} transform={transform}>
      <tspan dy="7.75">{stateCode}</tspan>
    </text>
  )
}

const SVGMap = () =>
  <Container maxWidth="md">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%"
      viewBox="-14 -7 700 431.2" preserveAspectRatio="xMinYMin"
      style={{ overflowx: 'hidden', positionx: 'relative' }}>
      {stateCodes.map(stateCode => <SVGMapPath stateCode={stateCode} key={stateCode} />)}
      {stateCodes.map(stateCode => <SVGMapRect stateCode={stateCode} key={stateCode} />)}
      {stateCodes.map(stateCode => <SVGMapText stateCode={stateCode} key={stateCode} />)}
    </svg>
  </Container>

export default SVGMap

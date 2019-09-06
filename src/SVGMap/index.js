import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import { useSpring, animated } from 'react-spring'
import { useCookies } from 'react-cookie'

import { stateCodes } from '../utilities/states'
import statePaths from './statePaths'
import theme from '../utilities/theme'

const stateColor = theme.palette.secondary.main
const stateColorOver = theme.palette.primary.main
const stateText = '#ffffff'

const useStyles = makeStyles({
  path: {
    stroke: '#ffffff',
    opacity: 1,
    cursor: 'pointer',
    strokeWidth: 2,
    transform: 'matrix(0.7, 0, 0, 0.7, 0, 0)',
  },
  rect: {
    opacity: 1,
    cursor: 'pointer',
    strokeOpacity: 0,
    strokeLinejoin: 'round',
    fillOpacity: 1,
    strokeWidth: 1.875,
  },
  text: {
    font: 'bold 22px Arial',
    textAnchor: 'middle',
    stroke: 'none',
    fill: stateText,
    cursor: 'pointer',
    strokeWidth: 0,
    opacity: 1,
  }
})

const addAllEvents = (stateCode, history, toggleFindState, setCookie, setStyle) => {
  const addEvents = (element, target, to, setStyle) => {
    element.addEventListener('click', event => {
      toggleFindState()
      setCookie('stateCode', stateCode)
      if (to && history.location.pathname !== to) {
        //history.push(to)
      }
    })
    element.addEventListener('mouseover', event => {
      if (setStyle) setStyle({ fill: stateColorOver })
    })
    element.addEventListener('mouseout', event => {
      if (setStyle) setStyle({ fill: stateColor })
    })
  }

  const to = `/states/${stateCode.toLowerCase()}`
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

const SVGMapPath = withRouter(({ stateCode, history, toggleFindState, setCookie }) => {
  const classes = useStyles()
  const [style, setStyle] = useSpring(() => ({ fill: stateColor, config: springConfig }))
  const className = `${classes.path} map-path-${stateCode}`
  const d = statePaths[stateCode].d

  useEffect(() => {
    addAllEvents(stateCode, history, toggleFindState, setCookie, setStyle)
  }, [setStyle, stateCode, history, toggleFindState, setCookie])

  return <animated.path d={d} style={style} className={className} />
})

const SVGMapRect = withRouter(({ stateCode, history, toggleFindState, setCookie }) => {
  const classes = useStyles()
  const className = `${classes.rect} map-rect-${stateCode}`
  const x = statePaths[stateCode].rectX
  const y = statePaths[stateCode].rectY
  const transform = statePaths[stateCode].rectTransform
  const [style, setStyle] = useSpring(() => ({ fill: stateColor, config: springConfig }))

  useEffect(() => {
    addAllEvents(stateCode, history, toggleFindState, setCookie, setStyle)
  }, [setStyle, stateCode, history, toggleFindState, setCookie])

  if (!statePaths[stateCode].hasLabel) return null

  return <animated.rect
    width="45" height="28" r="6" rx="6" ry="6"
    className={className} x={x} y={y} style={style} transform={transform} />
})

const SVGMapText = withRouter(({ stateCode, history, toggleFindState, setCookie }) => {
  const classes = useStyles()
  const className = `${classes.text} map-text-${stateCode}`
  const x = statePaths[stateCode].textX
  const y = statePaths[stateCode].textY
  const transform = statePaths[stateCode].textTransform

  useEffect(() => {
    addAllEvents(stateCode, history, toggleFindState, setCookie)
  }, [stateCode, history, toggleFindState, setCookie])

  return (
    <text className={className} x={x} y={y} transform={transform}>
      <tspan dy="7.75">{stateCode}</tspan>
    </text>
  )
})

const SVGMap = ({ svgStyle, toggleFindState }) => {
  const [cookie, setCookie] = useCookies([])

  return (
    <Container maxWidth="md">
      <animated.svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%"
        viewBox="-14 -7 700 431.2" preserveAspectRatio="xMinYMin"
        style={svgStyle}>
        {stateCodes.map(stateCode => <SVGMapPath stateCode={stateCode} key={stateCode} toggleFindState={toggleFindState} setCookie={setCookie} />)}
        {stateCodes.map(stateCode => <SVGMapRect stateCode={stateCode} key={stateCode} toggleFindState={toggleFindState} setCookie={setCookie} />)}
        {stateCodes.map(stateCode => <SVGMapText stateCode={stateCode} key={stateCode} toggleFindState={toggleFindState} setCookie={setCookie} />)}
      </animated.svg>
    </Container>
  )
}
export default SVGMap

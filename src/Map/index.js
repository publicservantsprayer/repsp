import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { useSpring, animated } from 'react-spring'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import svgPanZoom from 'svg-pan-zoom'
import statePaths from './statePaths'
import theme from '../utilities/theme'
import panZoomEventsHandler from './panZoomEventsHandler'
import useUSAState from '../utilities/useUSAState'

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

const addAllEvents = (stateCode, setStyle) => {
  const addEvents = (element, setStyle) => {
    element.addEventListener('mouseover', event => {
      if (setStyle) setStyle({ fill: stateColorOver })
    })
    element.addEventListener('mouseout', event => {
      if (setStyle) setStyle({ fill: stateColor })
    })
  }

  const mapPath = document.querySelector(`.map-path-${stateCode}`)
  const mapText = document.querySelector(`.map-text-${stateCode}`)
  const mapRect = document.querySelector(`.map-rect-${stateCode}`)

  addEvents(mapPath, setStyle)
  addEvents(mapText, setStyle)
  if (mapRect) addEvents(mapRect, setStyle)
}

const addClickEvent = (element, stateCode, history) => {
  if (!element) return

  element.addEventListener('click', event => {
    history.push(`/states/${stateCode.toLowerCase()}`)
  })
}

const springConfig = { mass: 1, tension: 170, friction: 26 }

const SVGMapPath = withRouter(({ stateCode, history }) => {
  const classes = useStyles()
  const [style, setStyle] = useSpring(() => ({ fill: stateColor, config: springConfig }))
  const className = `${classes.path} map-path-${stateCode}`
  const d = statePaths[stateCode].d

  React.useEffect(() => {
    const mapPath = document.querySelector(`.map-path-${stateCode}`)
    addClickEvent(mapPath, stateCode, history)
    addAllEvents(stateCode, setStyle)
  }, [setStyle, stateCode, history])

  return <animated.path d={d} style={style} className={className} />
})

const SVGMapRect = withRouter(({ stateCode, history }) => {
  const classes = useStyles()
  const className = `${classes.rect} map-rect-${stateCode}`
  const x = statePaths[stateCode].rectX
  const y = statePaths[stateCode].rectY
  const transform = statePaths[stateCode].rectTransform
  const [style, setStyle] = useSpring(() => ({ fill: stateColor, config: springConfig }))

  React.useEffect(() => {
    const mapRect = document.querySelector(`.map-rect-${stateCode}`)
    addClickEvent(mapRect, stateCode, history)
    addAllEvents(stateCode, setStyle)
  }, [history, setStyle, stateCode])

  if (!statePaths[stateCode].hasLabel) return null

  return <animated.rect
    width="45" height="28" r="6" rx="6" ry="6"
    className={className} x={x} y={y} style={style} transform={transform} />
})

const SVGMapText = withRouter(({ stateCode, history }) => {
  const classes = useStyles()
  const className = `${classes.text} map-text-${stateCode}`
  const x = statePaths[stateCode].textX
  const y = statePaths[stateCode].textY
  const transform = statePaths[stateCode].textTransform

  React.useEffect(() => {
    const mapText = document.querySelector(`.map-text-${stateCode}`)
    addClickEvent(mapText, stateCode, history)
  }, [stateCode, history])

  return (
    <text className={className} x={x} y={y} transform={transform}>
      <tspan dy="7.75">{stateCode}</tspan>
    </text>
  )
})

export default () => {
  const { stateCodes } = useUSAState()

  React.useEffect(() => {
    svgPanZoom('#map', {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: 1,
      center: 1,
      customEventsHandler: panZoomEventsHandler,
      //viewportSelector: '#pan-zoom-viewport',
    })
  })

  const moveMap = () => { }

  return (
    <Container maxWidth="md">
      <Box display="none" width="100%" m={1} mt={9}>
        <ButtonGroup fullWidth>
          <Button variant="contained" color="secondary" onClick={moveMap}>
            <ArrowBackIosIcon />
          </Button>
          <Button variant="contained" color="secondary" onClick={moveMap}>
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <div style={{ height: '500px' }}>
        <animated.svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%"
          viewBox="-14 -7 700 431.2" preserveAspectRatio="xMinYMin" id="map">
          {stateCodes.map(stateCode => <SVGMapPath stateCode={stateCode} key={stateCode} />)}
          {stateCodes.map(stateCode => <SVGMapRect stateCode={stateCode} key={stateCode} />)}
          {stateCodes.map(stateCode => <SVGMapText stateCode={stateCode} key={stateCode} />)}
        </animated.svg>
      </div>
    </Container >
  )
}

const fs = require('fs')

// A quick script / hack to pull out path data from generated SVG

const obj = {}
let d
let stateCode

// <path />
let file = fs.readFileSync('paths.txt', "utf8")
let lines = file.split('\n')

lines.map(line => {
  line = line.trim()
  if (line === '<path') return null
  let splited = line.split('d=')
  if (splited[1]) {
    d = splited[1].split('"')[1]
    return null
  }
  splited = line.split('className="map-state map-state-')[1]
  if (!splited) return null
  stateCode = splited.split('"></path')[0]
  obj[stateCode] = { d: d }
  d = null
  stateCode = null
  return null
})

// <rect />
file = fs.readFileSync('rects.txt', "utf8")
lines = file.split('\n')

lines.map(line => {
  line = line.trim()
  if (line === '<path') return null
  if (line === '</text>') return null
  let splited = line.split(' className="map-rect map-rect-')
  if (splited[0] === '<rect') {
    splited = splited[1].split('" x="')
    stateCode = splited[0]
    splited = splited[1].split('" y="')
    obj[stateCode].rectX = splited[0]
    splited = splited[1].split('" width="')
    obj[stateCode].rectY = splited[0]
    return null
  }

  splited = line.split('"5.63859375" ry="5.63859375" transform="')
  if (splited[0] === 'rx=') {
    splited = splited[1].split('"></rect>')
    obj[stateCode].rectTransform = splited[0]
    return null
  }

  splited = line.split('t x="')
  if (splited[0] == '<tex') {
    splited = splited[1].split('" y="')
    obj[stateCode].textX = splited[0]
    splited = splited[1].split('" transform="')
    obj[stateCode].textY = splited[0]
    splited = splited[1].split('" className="')
    obj[stateCode].textTransform = splited[0]
    return null
  }
  return null
})

// <text />
file = fs.readFileSync('text.txt', "utf8")
lines = file.split('\n')

lines.map(line => {
  line = line.trim()
  if (line === '</text>') return null

  let splited = line.split(' dy=')
  if (splited[0] === '<tspan') return null

  splited = line.split('map-label-')
  if (splited[0].split('className="')[1] === 'map-label ') {
    stateCode = splited[1].split('">')[0]
  }
  splited = line.split('t x="')
  if (splited[0] === '<tex') {
    splited = splited[1].split('" y="')
    obj[stateCode].textX = splited[0]
    splited = splited[1].split('" transform="')
    obj[stateCode].textY = splited[0]
    splited = splited[1].split('" className="')
    obj[stateCode].textTransform = splited[0]
    return null
  }
  return null
})

// convert js object to a string and write to the file system
let data = 'const statePaths = ' + JSON.stringify(obj, null, 2) + '\nexport default statePaths';
fs.writeFileSync('src/SVGMap/statePaths.js', data)

const wiki = require(`wikijs`).default
const fs = require('fs')

let statesObj = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
}

const stateCapitols = {
  Alabama: 'Montgomery',
  Alaska: 'Juneau',
  Arizona: 'Phoenix',
  Arkansas: 'Little Rock',
  California: 'Sacramento',
  Colorado: 'Denver',
  Connecticut: 'Hartford',
  Delaware: 'Dover',
  Florida: 'Tallahassee',
  Georgia: 'Atlanta',
  Hawaii: 'Honolulu',
  Idaho: 'Boise',
  Illinois: 'Springfield',
  Indiana: 'Indianapolis',
  Iowa: 'Des Moines',
  Kansas: 'Topeka',
  Kentucky: 'Frankfort',
  Louisiana: 'Baton Rouge',
  Maine: 'Augusta',
  Maryland: 'Annapolis',
  Massachusetts: 'Boston',
  Michigan: 'Lansing',
  Minnesota: 'St.Paul',
  Mississippi: 'Jackson',
  Missouri: 'Jeffeson City',
  Montana: 'Helena',
  Nebraska: 'Lincoln',
  Nevada: 'Carson City',
  'New Hampshire': 'Concord',
  'New Jersey': 'Trenton',
  'New Mexico': 'Santa Fe',
  'New York': 'Albany',
  'North Carolina': 'Columbus',
  Oklahoma: 'Oklahoma City',
  Oregon: 'Salem',
  Pennsylvania: 'Harrisburg',
  'Rhode Island': 'Providence',
  'South Carolina': 'Columbia',
  'South Dakota': 'Pierre',
  Tennessee: 'Nashville',
  Texas: 'Austin',
  Utah: 'Salt Lake City',
  Vermont: 'Montpelier',
  Virginia: 'Richmond',
  Washington: 'Olympia',
  'West Virginia': 'Charleston',
  Wisconsin: 'Madison',
  Wyoming: 'Cheyenne',
}

let stateNames = Object.values(statesObj)
let stateCodes = Object.keys(statesObj)

const obj = {}

const getStateInfo = async stateCode => {
  try {
    let stateName = statesObj[stateCode]
    if (stateName === 'Washington') stateName = 'Washington (state)'
    const page = await wiki().page(stateName)
    const info = await page.info()
    const capitol = stateCapitols[statesObj[stateCode]]
    console.log(capitol)
    // add wikipedias info to our obj
    obj[stateCode] = info
    obj[stateCode].capitol = capitol

    console.log('got info: ', stateName)
  } catch (error) {
    console.log('error downloading: ', stateName)
  }
}

;(async () => {
  //stateCodes = ['WA']

  const doStateCodes = stateCodes.map(stateCode => {
    return getStateInfo(stateCode).catch(err => console.log('ERR:', err))
  })

  await Promise.all(doStateCodes)

  // order by keys
  const orderedObj = {}
  Object.keys(obj)
    .sort()
    .forEach(function(key) {
      orderedObj[key] = obj[key]
    })

  // convert js object to a string and write to the file system
  let data =
    'const stateFactsData = ' +
    JSON.stringify(orderedObj, null, 2) +
    '\n\nexport default stateFactsData'
  fs.writeFileSync('stateFactsData.js', data)
})()

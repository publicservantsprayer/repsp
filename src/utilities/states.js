import { useCookies } from 'react-cookie'

const statesObj = {
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

const stateCodes = Object.keys(statesObj)

const stateName = stateCode => statesObj[stateCode.toUpperCase()]


const useStateCode = (location) => {
  const [cookies] = useCookies(['stateCode'])
  if (location && location.pathname) {
    /* eslint-disable-next-line no-unused-vars */
    const [_, states, stateCode] = location.pathname.split('/')
    if (states === 'states') {
      return stateCode.toUpperCase()
    }
  }
  if (cookies.stateCode) {
    return cookies.stateCode
  } else {
    console.log('Got default stateCode TX')
    return 'TX'
  }
}

export { statesObj, stateName, stateCodes, useStateCode }

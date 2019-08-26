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
  WY: 'Wyoming'
}

const regionForStateCode = stateCode => {
  if (['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'PA', 'NJ'].includes(stateCode)) {
    return "NE"
  } else if (['WI', 'MI', 'IL', 'IN', 'OH', 'MO', 'ND', 'SD', 'NE', 'KS', 'MN', 'IA'].includes(stateCode)) {
    return "MW"
  } else if (['DE', 'MD', 'DC', 'VA', 'WV', 'NC', 'SC', 'GA', 'FL', 'KY', 'TN', 'MS', 'AL', 'OK', 'TX', 'AR', 'LA'].includes(stateCode)) {
    return "S"
  } else if (['ID', 'MT', 'WY', 'NV', 'UT', 'CO', 'OR', 'AZ', 'NM', 'AK', 'WA', 'CA', 'HI'].includes(stateCode)) {
    return "W"
  }
  return null
}


module.exports.statesObj = statesObj
module.exports.stateCodes = Object.keys(statesObj)
module.exports.regionForStateCode = regionForStateCode

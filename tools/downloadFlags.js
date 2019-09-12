const wiki = require(`wikijs`).default
const wget = require('node-wget-promise')

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

const getFlagSrc = async stateName => {
  try {
    const page = await wiki().page(stateName)
    const rawImages = await page.rawImages()
    const fullInfo = await page.fullInfo()
    const flagName = fullInfo.general.imageFlag
    const obj = {}
    rawImages.forEach(infoObj => {
      obj[infoObj.title] = infoObj.imageinfo
    })
    const [imageInfo] = obj[`File:${flagName}`]

    await wget(imageInfo.url, { output: stateName + '.svg' })
    console.log('downloaded: ', stateName)
  } catch (error) {
    //console.log('error: ', error)
    console.log('error downloading: ', stateName)
  }
}
let items = Object.values(statesObj)

items.map(stateName => {
  getFlagSrc(stateName).catch(err => console.log('ERR:', err))
})

//stateName()
//getFlagSrc(stateName).catch(err => {
//  console.log('ERR:', err)

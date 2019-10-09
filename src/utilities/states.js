import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const googleBrowserKey = 'AIzaSyBQkLQ1DJEtDczE179QNc7fF1UM6t0piqY'

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

const stateName = stateCode => statesObj[stateCode]

const validStateCode = stateCode => stateCodes.includes(stateCode)

const useStateCode = (options = {}) => {
  const { useGeoCode } = options
  const [cookies, setCookie] = useCookies(['stateCode'])
  const params = useParams()

  const fallBackStateCode = 'TX'
  const cookieStateCode = cookies.stateCode ? cookies.stateCode.toUpperCase() : null
  const paramStateCode = params.stateCode ? params.stateCode.toUpperCase() : null

  const setStateCodeToCookie = stateCode => setCookie('stateCode', stateCode.toUpperCase(), { path: '/' })

  useEffect(() => {
    const getGeoCodeState = async () => {
      try {
        const geoLocation = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleBrowserKey}`)
        const { lng, lat } = geoLocation.data.location
        const geoCode = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=administrative_area_level_1&key=${googleBrowserKey}`)
        const stateCodeGeoCode = geoCode.data.results[0].address_components[0].short_name
        if (validStateCode(stateCodeGeoCode)) {
          console.log('Setting stateCode from geoCode: ', stateCodeGeoCode)
          setStateCodeToCookie(stateCodeGeoCode)
        } else {
          console.error('Got invalid stateCode from GeoCode: ', stateCodeGeoCode)
          setStateCodeToCookie(fallBackStateCode)
        }
      } catch (error) {
        console.error('Error getting State from GeoCode: ', error)
        setStateCodeToCookie(fallBackStateCode)
      }
    }

    if (!validStateCode(cookieStateCode) && useGeoCode) getGeoCodeState()
  })

  if (validStateCode(paramStateCode)) {
    if (paramStateCode !== cookieStateCode) setStateCodeToCookie(paramStateCode)
  }

  return cookieStateCode
}

const useHomePath = () => {
  const stateCode = useStateCode()
  if (stateCode) return `/states/${stateCode.toLowerCase()}`
  else return '/'
}


export { statesObj, stateName, stateCodes, useStateCode, validStateCode, useHomePath }

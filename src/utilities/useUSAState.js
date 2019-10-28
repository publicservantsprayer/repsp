import React from 'react'
import statesObj from './statesObj'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const googleBrowserKey = 'AIzaSyBQkLQ1DJEtDczE179QNc7fF1UM6t0piqY'

const stateCodes = Object.keys(statesObj)

const validStateCode = stateCode => stateCodes.includes(stateCode)

const useStateCode = (options = {}) => {
  const { useGeoCode } = options
  const [cookies, setCookie] = useCookies(['stateCode'])
  const params = useParams()

  const fallBackStateCode = 'TX'
  const cookieStateCode = cookies.stateCode ? cookies.stateCode.toUpperCase() : null
  const paramStateCode = params.stateCode ? params.stateCode.toUpperCase() : null

  const setStateCodeToCookie = stateCode => setCookie('stateCode', stateCode.toUpperCase(), { path: '/' })

  React.useEffect(() => {
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

export default () => {
  const stateCode = useStateCode()
  const lowerCaseStateCode = stateCode.toLowerCase()
  const stateName = statesObj[stateCode]

  const stateNameFromStateCode = stateCode => statesObj[stateCode]

  return ({
    stateCode,
    lowerCaseStateCode,
    stateName,
    stateNameFromStateCode,
    stateCodes,
    statesObj,
  })
}

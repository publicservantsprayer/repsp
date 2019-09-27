import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

export default withRouter(props => {
  const { location } = props
  const [cookies, setCookie] = useCookies(['updateStateCode'])
  const params = location.pathname.split('/')
  const [, param1, param2] = params

  useEffect(() => {
    console.log('Running CookieSetter.  stateCode cookie is: ', cookies.stateCode)

    if (param1 === 'states') {
      const urlStateCode = param2

      if (cookies.stateCode !== urlStateCode.toUpperCase()) {
        console.log('Setting stateCode from URL')
        setCookie('stateCode', urlStateCode.toUpperCase(), { path: '/' })
      }
    }

    if (!cookies.stateCode) {
      (async () => {
        try {
          const response = await axios.get('http://ip-api.com/json/?fields=region')
          setCookie('stateCode', response.data.region.toUpperCase(), { path: '/' })
          console.log('Setting stateCode from IP: ', response)
        }
        catch (error) {
          console.error('Error getting State from IP: ', error)
          setCookie('stateCode', 'IN', { path: '/' })
        }
      })()
    }
  })

  return null
})

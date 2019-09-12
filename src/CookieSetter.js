import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default withRouter(props => {
  const { location, history } = props
  const [cookies, setCookie, removeCookie] = useCookies(['updateStateCode'])
  const params = location.pathname.split('/')
  const [param0, param1, param2, ...restOfParams] = params

  useEffect(() => {
    console.log('cookie', cookies.stateCode)
    if (param1 === 'states' && cookies.updateStateCode) {
      const cookieStateCode = cookies.updateStateCode
      const newPathname = [param0, param1, cookieStateCode.toLowerCase()]
        .concat(restOfParams)
        .join('/')

      setCookie('stateCode', cookieStateCode.toUpperCase())
      removeCookie('updateStateCode')
      history.push(newPathname)
    }

    if (param1 === 'states' && !cookies.updateStateCode) {
      const urlStateCode = param2

      if (cookies.stateCode !== urlStateCode) {
        setCookie('stateCode', urlStateCode.toUpperCase())
      }
    }

    if (param1 !== 'states' && cookies.updateStateCode) {
      if (cookies.stateCode !== cookies.updateStateCode) {
        setCookie('stateCode', cookies.updateStateCode.toUpperCase())
        removeCookie('updateStateCode')
      }
    }
  })

  return null
})

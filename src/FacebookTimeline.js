import React, { useEffect } from 'react'

import Box from '@material-ui/core/Box'
import useUSAState from './utilities/useUSAState'

export default ({ accountName }) => {
  const { facebookPage } = useUSAState()

  useEffect(() => {
    window.FB.init({
      appId: '2421676531429086',
      version: 'v4.0',
      xfbml: true
    })
  }, [])

  return (
    <Box
      className="fb-page"
      data-href={`https://www.facebook.com/${facebookPage}/`}
      data-tabs="timeline"
      data-width="340"
      data-height=""
      data-small-header="true"
      data-adapt-container-width="true"
      data-hide-cover="true"
      data-show-facepile="false" />
  )
}

import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { withSize } from 'react-sizeme'

import useUSAState from './utilities/useUSAState'

export default withSize()(function FacebookTimeline({ size }) {
  const [width, setWidth] = React.useState()
  const { facebookPage } = useUSAState()
  const facebook = window.FB

  useEffect(() => {
    setWidth(size.width)
    if (facebook && width > 0) {
      facebook.init({
        appId: '2421676531429086',
        version: 'v4.0',
        xfbml: true,
      })
    }
  }, [facebook, width, size.width])

  return (
    <Box>
      <Box
        className="fb-page"
        data-href={`https://www.facebook.com/${facebookPage}/`}
        data-tabs="timeline"
        data-width={size.width}
        data-height=""
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="true"
        data-show-facepile="false"
      />
    </Box>
  )
})

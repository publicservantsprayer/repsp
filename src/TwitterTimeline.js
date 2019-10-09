import React, { useEffect } from 'react'

import Box from '@material-ui/core/Box'
import { useStateCode } from './utilities/states'

export default ({ stateCode }) => {
  const siteStateCode = useStateCode()
  stateCode = stateCode ? stateCode : siteStateCode
  const elementId = `twitter-timeline-${stateCode}`

  useEffect(() => {
    window.twttr.widgets.createTimeline(
      {
        sourceType: "profile",
        screenName: `Praying4_${stateCode}`,
      },
      document.getElementById(elementId),
      {
        theme: 'dark',
        height: '400',
        dnt: true,
        chrome: 'transparent nofooter'
      }
    )
  }, [stateCode, elementId])

  return (
    <Box id={elementId} />
  )
}

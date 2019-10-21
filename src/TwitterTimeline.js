import React, { useEffect } from 'react'

import Box from '@material-ui/core/Box'

export default ({ accountName }) => {
  const elementId = `twitter-timeline-${accountName}`

  useEffect(() => {
    window.twttr.widgets.createTimeline(
      {
        sourceType: "profile",
        screenName: accountName,
      },
      document.getElementById(elementId),
      {
        theme: 'dark',
        height: '400',
        dnt: true,
        chrome: 'transparent nofooter'
      }
    )
  }, [accountName, elementId])

  return (
    <Box id={elementId} />
  )
}

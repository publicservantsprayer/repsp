import React, { useEffect } from 'react'

import Paper from '@material-ui/core/Paper'
import { useStateCode } from '../utilities/states'

export default () => {
  const stateCode = useStateCode()

  useEffect(() => {
    window.twttr.widgets.createTimeline(
      {
        sourceType: "profile",
        screenName: `Praying4_${stateCode}`,
      },
      document.getElementById("twitter-timeline"),
      {
        theme: 'dark',
        height: '400',
        dnt: true,
        chrome: 'transparent nofooter'

      }
    )
  }, [stateCode])

  return (
    <Paper id="twitter-timeline" />
  )
}

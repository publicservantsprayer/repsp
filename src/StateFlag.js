import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'

import wiki from 'wikijs'
import { statesObj } from './utilities/states'

const StateFlag = () => {
  const [flagUrl, setFlagUrl] = useState()
  useEffect(() => {
    const getFlagSrc = async () => {
      const page = await wiki().page(statesObj['IN'])
      const rawImages = await page.rawImages()
      const fullInfo = await page.fullInfo()
      const flagName = fullInfo.general.imageFlag
      const obj = {}
      rawImages.forEach(infoObj => {
        obj[infoObj.title] = infoObj.imageinfo
      })
      const [imageInfo] = obj[`File:${flagName}`]
      console.log(imageInfo.url)
      setFlagUrl(imageInfo.url)
    }

    getFlagSrc()
  }, [])

  if (!flagUrl) {
    return <p>loading..</p>
  }

  return (
    <Box>
      <p>
        <img src={flagUrl} width="150" alt="whatevs" />
      </p>
    </Box>
  )
}

export default StateFlag

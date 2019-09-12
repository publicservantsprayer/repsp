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

/*const StateFlag = (stateCode) => {
  Alabama = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Alabama.svg/1280px-Flag_of_Alabama.svg.png'
  Alaska = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Alaska.svg/1280px-Flag_of_Alaska.svg.png'
  Arizona = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arizona.svg/1280px-Flag_of_Arizona.svg.png'
  Arkansas = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arkansas.svg/1280px-Flag_of_Arkansas.svg.png'
  California = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/1280px-Flag_of_California.svg.png'
  Colorado = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colorado_designed_by_Andrew_Carlisle_Carson.svg/1280px-Flag_of_Colorado_designed_by_Andrew_Carlisle_Carson.svg.png'
  Connecticut = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_Connecticut.svg/1280px-Flag_of_Connecticut.svg.png'
  Delaware = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Flag_of_Delaware.svg/1280px-Flag_of_Delaware.svg.png'
  Florida = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/1280px-Flag_of_Florida.svg.png'
  Georgia = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/1920px-Flag_of_Georgia_%28U.S._state%29.svg.png'
  Hawaii = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Hawaii.svg/1920px-Flag_of_Hawaii.svg.png'
  Idaho = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Idaho.svg/1280px-Flag_of_Idaho.svg.png'
  Illinois = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/1920px-Flag_of_Illinois.svg.png'
  Indiana = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Flag_of_Indiana.svg/1280px-Flag_of_Indiana.svg.png'
  Iowa = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Iowa.svg/1280px-Flag_of_Iowa.svg.png'
  Kansas = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Kansas.svg/1920px-Flag_of_Kansas.svg.png'
  Kentucky = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Flag_of_Kentucky.svg/1920px-Flag_of_Kentucky.svg.png'
  Louisiana = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flag_of_Louisiana.svg/255px-Flag_of_Louisiana.svg.png'
  Maine = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Maine.svg/216px-Flag_of_Maine.svg.png'
  Maryland = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Maryland.svg/255px-Flag_of_Maryland.svg.png'
  Massachusetts = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Massachusetts.svg/255px-Flag_of_Massachusetts.svg.png'
  Michigan =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/1280px-Flag_of_Michigan.svg.png'
  Minnesota = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Minnesota.svg/255px-Flag_of_Minnesota.svg.png'
  Mississippi = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_Mississippi.svg/1280px-Flag_of_Mississippi.svg.png'
  Missouri = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flag_of_Missouri.svg/200px-Flag_of_Missouri.svg.png'
  Montana = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Montana.svg/255px-Flag_of_Montana.svg.png'
  Nebraska = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Nebraska.svg/255px-Flag_of_Nebraska.svg.png'
  Nevada = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Nevada.svg/255px-Flag_of_Nevada.svg.png'
  New Hampshire = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_New_Hampshire.svg/255px-Flag_of_New_Hampshire.svg.png'
  New Jersey = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_New_Jersey.svg/300px-Flag_of_New_Jersey.svg.png'
  New Mexico = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_New_Mexico.svg/255px-Flag_of_New_Mexico.svg.png'
  New York = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_New_York.svg/255px-Flag_of_New_York.svg.png'
  North Carolina = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_North_Carolina.svg/200px-Flag_of_North_Carolina.svg.png'
  North Dakota = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Flag_of_North_Dakota.svg/217px-Flag_of_North_Dakota.svg.png'
  Ohio = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Ohio.svg/255px-Flag_of_Ohio.svg.png'
  Oklahoma = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Oklahoma.svg/255px-Flag_of_Oklahoma.svg.png'
  Oregon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Oregon.svg/255px-Flag_of_Oregon.svg.png'
  Pennsylvania = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Pennsylvania.svg/255px-Flag_of_Pennsylvania.svg.png'
  Rhode Island = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Rhode_Island.svg/185px-Flag_of_Rhode_Island.svg.png'
  South Carolina = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_South_Carolina.svg/255px-Flag_of_South_Carolina.svg.png'
  South Dakota = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_South_Dakota.svg/255px-Flag_of_South_Dakota.svg.png'
  Tennessee = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Tennessee.svg/255px-Flag_of_Tennessee.svg.png'
  Texas = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/255px-Flag_of_Texas.svg.png'
  Utah = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Utah.svg/255px-Flag_of_Utah.svg.png'
  Vermont = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Vermont.svg/255px-Flag_of_Vermont.svg.png'
  Virginia = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Virginia.svg/248px-Flag_of_Virginia.svg.png'
  Washington = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/255px-Flag_of_Washington.svg.png'
  West Virginia = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_West_Virginia.svg/255px-Flag_of_West_Virginia.svg.png'
  Wisconsin = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_Wisconsin.svg/200px-Flag_of_Wisconsin.svg.png'
  Wyoming = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/243px-Flag_of_Wyoming.svg.png'
}


export default StateFlag*/

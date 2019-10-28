import React from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export default ({ dateID }) => {
  const today = moment().isSame(moment(dateID), 'day')

  return (
    <Box my={2} fontWeight="bold" textAlign="center">
      <Typography variant="h5" color="secondary">
        {today && <>Today we are praying for</>}
        {!today && <>This day we prayed for</>}
      </Typography>
    </Box>
  )
}

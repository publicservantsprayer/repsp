import React from 'react'
import Box from '@material-ui/core/Box'

import Screen from '../Screen'

export default () => {
  return (
    <Screen>
      <Box variant="body1">
        <Box bgcolor="primary.main" color="primary.contrastText" p={2} m={1}>
          bgcolor: primary.main | color="primary.contrastText"
        </Box>
        <Box bgcolor="secondary.main" color="secondary.contrastText" p={2} m={1}>
          bgcolor: secondary.main | color="secondary.contrastText"
        </Box>
        <Box bgcolor="error.main" color="error.contrastText" p={2} m={1}>
          bgcolor="error.main" | color="error.contrastText"
        </Box>
        <Box bgcolor="background.paper" color="text.primary" p={2} m={1}>
          bgcolor: background.paper | color="text.primary"
        </Box>
        <Box bgcolor="background.paper" color="text.primary" p={2} m={1}>
          bgcolor: background.paper | color="text.primary"
        </Box>
        <Box bgcolor="background.paper" color="text.secondary" p={2} m={1}>
          bgcolor: background.paper | color="text.secondary"
        </Box>
        <Box bgcolor="background.paper" color="text.disabled" p={2} m={1}>
          bgcolor: background.paper | color="text.disabled"
        </Box>
        <Box bgcolor="background.paper" color="text.hint" p={2} m={1}>
          bgcolor: background.paper | color="text.hint"
        </Box>
      </Box>
    </Screen>
  )
}

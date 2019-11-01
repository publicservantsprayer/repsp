import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Inspector from 'react-inspector'
import { useTheme } from '@material-ui/core/styles'

export default function ThemeExplorer() {
  const theme = useTheme()

  return (
    <>
      <Box
        p={2}
        my={1}
        bgcolor={theme.palette.type === 'light' ? 'background.paper' : 'background.dark'}
        clone>
        <Paper>
          <Inspector
            data={theme}
            theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'}
          />
        </Paper>
      </Box>
    </>
  )
}

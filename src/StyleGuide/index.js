import React from 'react'
import Box from '@material-ui/core/Box'
import Palette from './Palette'
import ThemeExplorer from './ThemeExplorer'
import Typography from './Typography'
import { Divider } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { lightTheme } from '../utilities/theme'
import { H1, H2 } from '../utilities/formating'

const Example = ({ children }) => {
  return (
    <Box width="100%" maxWidth="500px" m={2}>
      {children}
    </Box>
  )
}

export default () => {
  return (
    <>
      <H1>Style Guide</H1>
      <H2>Dark Theme</H2>
      <Box my={4} display="flex" flexWrap="wrap" bgcolor="background.default">
        <Example>
          <ThemeExplorer />
        </Example>
        <Example>
          <Palette />
        </Example>
        <Example>
          <Typography />
        </Example>
      </Box>

      <Divider />

      <H2>Light Theme</H2>
      <ThemeProvider theme={lightTheme}>
        <Box my={4} display="flex" flexWrap="wrap" bgcolor="background.default">
          <Example>
            <ThemeExplorer />
          </Example>
          <Example>
            <Palette />
          </Example>
          <Example>
            <Typography />
          </Example>
        </Box>
      </ThemeProvider>
    </>
  )
}

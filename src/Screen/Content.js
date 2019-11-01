import React from 'react'
import Box from '@material-ui/core/Box'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import useDesktop from '../utilities/useDesktop'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      //main: '#1976d2',
      main: '#4F6EC0',
      //main: '#3459A9',
    },
    secondary: {
      main: '#ffe082',
      //main: '#EFC1D9',
    },
  },
})

const LightThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const ScreenContent = ({ children }) => {
  const desktop = useDesktop()
  const paddingX = desktop ? 12 : 2
  const paddingTop = desktop ? 10 : 6
  const paddingBottom = desktop ? 12 : 12

  return (
    <Container maxWidth="md">
      <Box px={paddingX} pt={paddingTop} pb={paddingBottom} bgcolor="background.paper">
        {children}
      </Box>
    </Container>
  )
}

export default function Content({ children, light }) {
  if (!light) return <ScreenContent>{children}</ScreenContent>
  return (
    <LightThemeProvider>
      <ScreenContent>{children}</ScreenContent>
    </LightThemeProvider>
  )
}

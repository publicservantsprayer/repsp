import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#82b1ff',
    },
  },
})

export const theme2 = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#708690',
      main: '#445963',
      dark: '#1b3039',
      contrastText: '#80d8ff',
    },
    secondary: {
      light: '#e6ffff',
      main: '#b3e5fc',
      dark: '#82b3c9',
      contrastText: '#263238',
    },
  },
})

export default theme

import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      //main: '#1976d2',
      main: '#4F6EC0',
      //main: '#3459A9',
    },
    secondary: {
      main: '#ffe082',
      //main: '#EFC1D9',
    },
    background: {
      default: '#212121'
    }
  },
})

export const theme1 = createMuiTheme({
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

import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/functions'
import { CssBaseline } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/styles'
import { CookiesProvider } from 'react-cookie'
import { SnackbarProvider } from 'notistack'

import App from './App'
import { environment, firebaseFunctionsEmulator } from './utilities/environment'
import { FirebaseProvider } from './utilities/firebase'
import theme from './utilities/theme'

const config = {
  staging: {
    firebase: {
      apiKey: 'AIzaSyCEUBVTFGsCzQ5fSLdBc39Ct2SpmtQyRI4',
      authDomain: 'thepsp-org-staging.firebaseapp.com',
      databaseURL: 'https://thepsp-org-staging.firebaseio.com',
      projectId: 'thepsp-org-staging',
      storageBucket: 'thepsp-org-staging.appspot.com',
      messagingSenderId: '798172770344',
      appId: '1:798172770344:web:4959d730292fcf7be5c51d',
    },
  },
  production: {
    firebase: {
      apiKey: 'AIzaSyBQkLQ1DJEtDczE179QNc7fF1UM6t0piqY',
      authDomain: 'repsp123.firebaseapp.com',
      databaseURL: 'https://repsp123.firebaseio.com',
      projectId: 'repsp123',
      storageBucket: 'repsp123.appspot.com',
      messagingSenderId: '1081890506539',
      appId: '1:1081890506539:web:61606bc159584f95',
    },
  },
}

firebase.initializeApp(config[environment].firebase)
firebase.firestore().enablePersistence()

if (firebaseFunctionsEmulator) {
  console.log('Using local functions emulator')
  firebase.functions().useFunctionsEmulator('http://localhost:5001')
}

const notistackRef = React.createRef()
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key)
}

ReactDOM.render(
  <CookiesProvider>
    <FirebaseProvider value={firebase}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          preventDuplicate
          ref={notistackRef}
          action={key => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </FirebaseProvider>
  </CookiesProvider>,
  document.getElementById('root')
)

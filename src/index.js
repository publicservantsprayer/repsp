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
import * as env from 'env-var'

import App from './App'
import { FirebaseProvider } from './firebase'
import theme from './utilities/theme'

const firebaseConfig = {
  apiKey: 'AIzaSyBQkLQ1DJEtDczE179QNc7fF1UM6t0piqY',
  authDomain: 'repsp123.firebaseapp.com',
  databaseURL: 'https://repsp123.firebaseio.com',
  projectId: 'repsp123',
  storageBucket: 'repsp123.appspot.com',
  messagingSenderId: '1081890506539',
  appId: '1:1081890506539:web:61606bc159584f95',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore().enablePersistence()

if (env.get('REACT_APP_FIREBASE_FUNCTIONS_EMULATOR').asBool()) {
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

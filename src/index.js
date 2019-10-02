import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { CookiesProvider } from 'react-cookie'

import App from './App'
import { FirebaseProvider } from './firebase'
import theme from './utilities/theme'

const firebaseConfig = {
  apiKey: "AIzaSyBQkLQ1DJEtDczE179QNc7fF1UM6t0piqY",
  authDomain: "repsp123.firebaseapp.com",
  databaseURL: "https://repsp123.firebaseio.com",
  projectId: "repsp123",
  storageBucket: "repsp123.appspot.com",
  messagingSenderId: "1081890506539",
  appId: "1:1081890506539:web:61606bc159584f95"
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <CookiesProvider>
    <FirebaseProvider value={firebase}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider >
    </FirebaseProvider>
  </CookiesProvider>,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import app from 'firebase/app'
import 'firebase/firestore'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import App from './App'
import Firebase from './Firebase'
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

app.initializeApp(firebaseConfig)

ReactDOM.render(
  <Firebase.Provider value={app.firestore()}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider >
  </Firebase.Provider>,
  document.getElementById('root')
)

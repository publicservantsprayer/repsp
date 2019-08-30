import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { ThemeProvider } from '@material-ui/styles'

import NavBar from './NavBar'
import USMap from './screens/USMap'
import StateHome from './screens/StateHome'
import StateLeaders from './screens/StateLeaders'
import StateLeader from './screens/StateLeader'
import Articles from './screens/Articles'
import theme from './utilities/theme'

function App () {
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="false" >
      <Box my={4} backgroundColor='black'>
        <Typography variant="h4" component="h1" ></Typography>
          <Router>
    
            <Route component={NavBar} />

            <Route exact path="/" component={USMap} />
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/states/:stateCode" component={StateHome} />
            <Route exact path="/states/:stateCode/leader/:id" component={StateLeader} />
            <Route path="/states/:stateCode/leaders" component={StateLeaders} />
        </Router>
      </Box>
      </Container> 
    </ThemeProvider>
  )
}

export default App

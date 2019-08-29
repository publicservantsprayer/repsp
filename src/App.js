import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"


import NavBar from './NavBar'
import USMap from './screens/USMap'
import StateHome from './screens/StateHome'
import StateLeaders from './screens/StateLeaders'
import StateLeader from './screens/StateLeader'
import News from './screens/News'

function App () {
  return (
    <Router>
    
      <Route component={NavBar} />

      <Route exact path="/" component={USMap} />
      <Route exact path="/news" component={News} />
      <Route exact path="/states/:stateCode" component={StateHome} />
      <Route exact path="/states/:stateCode/leader/:id" component={StateLeader} />
      <Route path="/states/:stateCode/leaders" component={StateLeaders} />
    </Router>
  )
}

export default App

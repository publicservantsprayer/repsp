import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"


import NavBar from './NavBar'
import USMap from './screens/USMap'
import StateHome from './screens/StateHome'
import StateLeaders from './screens/StateLeaders'

function App () {
  return (
    <Router>
      <Route component={NavBar} />

      <div className="container">
        <Route exact path="/" component={USMap} />
        <Route exact path="/states/:stateCode" component={StateHome} />
        <Route path="/states/:stateCode/leaders" component={StateLeaders} />
      </div>
    </Router>
  )
}

export default App

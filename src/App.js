import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import NavBar from './NavBar'
import DailyLeaders from './screens/DailyLeaders'
import StateLeaders from './screens/StateLeaders'
import StateLeader from './screens/StateLeader'
import Articles from './screens/Articles'

function App () {
  return (
    <Router>
      <Route component={NavBar} />
      <Route exact path="/" component={Articles} />
      <Route exact path="/articles" component={Articles} />
      <Route exact path="/states/:stateCode" component={DailyLeaders} />
      <Route exact path="/states/:stateCode/leader/:id" component={StateLeader} />
      <Route path="/states/:stateCode/leaders" component={StateLeaders} />
    </Router>
  )
}

export default App

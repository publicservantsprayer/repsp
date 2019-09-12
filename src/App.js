import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import CookieSetter from './CookieSetter'
import NavBar from './NavBar'
import DailyLeaders from './screens/DailyLeaders'
import StateLeaders from './screens/StateLeaders'
import StateLeader from './screens/StateLeader'
import Articles from './screens/Articles'
import WhatWeDo from './screens/WhatWeDo'
import WhyWePray from './screens/WhyWePray'
import Footer from './Footer'

function App () {
  return (
    <Router>
      <Route component={CookieSetter} />
      <Route component={NavBar} />
      <Route exact path="/" component={Articles} />
      <Route exact path="/articles" component={Articles} />
      <Route exact path="/what-we-do" component={WhatWeDo} />
      <Route exact path="/why-we-pray" component={WhyWePray} />
      <Route exact path="/states/:stateCode" component={DailyLeaders} />
      <Route exact path="/states/:stateCode/leader/:id" component={StateLeader} />
      <Route path="/states/:stateCode/leaders" component={StateLeaders} />
      <Route component={Footer} />
    </Router>
  )
}

export default App

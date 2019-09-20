import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import CookieSetter from './CookieSetter'
import NavBar from './NavBar'
import Home from './screens/Home'
import StateLeaders from './screens/StateLeaders'
import StateLeader from './screens/StateLeader'
import News from './screens/News'
import Events from './screens/Events'
import WhatWeDo from './screens/WhatWeDo'
import WhyWePray from './screens/WhyWePray'
import WomensMinistry from './screens/WomensMinistry'
import Content from './Content'
import Footer from './Footer'

function App () {
  const [cookies, setCookie] = useCookies([])

  if (!cookies.stateCode) {
    ; (async () => {
      try {
        const response = await axios.get(
          'http://ip-api.com/json/?fields=region'
        )
        console.log('Got State from IP: ', response)
        setCookie('stateCode', response.region)
      } catch (error) {
        console.error('Error getting State from IP: ', error)
        setCookie('stateCode', 'IN')
      }
    })()
  }

  return (
    <Router>
      <Route component={CookieSetter} />
      <Route component={NavBar} />
      <Route exact path="/news" component={News} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/what-we-do" component={WhatWeDo} />
      <Route exact path="/why-we-pray" component={WhyWePray} />
      <Route exact path="/womens-ministry" component={WomensMinistry} />
      <Route exact path="/states/:stateCode" component={Home} />
      <Route exact path="/content" component={Content} />
      <Route
        exact
        path="/states/:stateCode/leader/:id"
        component={StateLeader}
      />
      <Route path="/states/:stateCode/leaders" component={StateLeaders} />
      <Route component={Footer} />
    </Router>
  )
}

export default App

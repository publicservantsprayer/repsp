import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import CookieSetter from './CookieSetter'
import NavBar from './NavBar'
import Home from './screens/Home'
import StateLeaders from './screens/StateLeaders'
import Leader from './screens/Leader'
import News from './screens/News'
import NewsItem from './screens/NewsItem'
import Events from './screens/Events'
import Event from './screens/Event'
import WhatWeDo from './screens/WhatWeDo'
import WhyWePray from './screens/WhyWePray'
import WomensMinistry from './screens/WomensMinistry'
import Content from './Content'
import Footer from './Footer'
import Updates from './screens/Updates'
import Articles from './screens/Articles'
import About from './About'

function App() {
  const [cookies, setCookie] = useCookies([])

  if (!cookies.stateCode) {
    ;(async () => {
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
      <Route exact path="/about" component={About} />
      <Route exact path="/articles" component={Articles} />
      <Route exact path="/updates" component={Updates} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/event/:docId" component={Event} />
      <Route exact path="/news-item/:docId" component={NewsItem} />
      <Route exact path="/what-we-do" component={WhatWeDo} />
      <Route exact path="/why-we-pray" component={WhyWePray} />
      <Route exact path="/womens-ministry" component={WomensMinistry} />
      <Route exact path="/updates" component={Updates} />
      <Route exact path="/states/:stateCode" component={Home} />
      <Route exact path="/content" component={Content} />
      <Route exact path="/leader/:id" component={Leader} />
      <Route path="/states/:stateCode/leaders" component={StateLeaders} />
      <Route component={Footer} />
    </Router>
  )
}

export default App

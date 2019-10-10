import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './NavBar'
import Home from './screens/Home'
import StateLeaders from './State/StateLeaders'
import Leader from './screens/Leader'
import ContentItem from './screens/ContentItem'
import FindYourState from './screens/FindYourState'
import Content from './Content'
import ContentEdit from './Content/Edit'
import ContentNew from './Content/New'
import Footer from './Footer'
import Updates from './screens/Updates'
import SignIn from './screens/SignIn'
import SignInEmailLinkLanding from './SignIn/EmailLinkLanding'
import SignOut from './SignIn/SignOut'
import PostBrowser from './PostBrowser'
import ContentCollection from './screens/ContentCollection'

const App = () => {
  return (
    <Router>
      <Route component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route exact path="/states/:stateCode" component={Home} />
      <Route exact path="/about">
        <ContentItem docId="about" />
      </Route>
      <Route exact path="/articles">
        <ContentCollection category="articles" />
      </Route>
      <Route exact path="/articles/:docId">
        <ContentItem />
      </Route>
      <Route exact path="/events">
        <ContentCollection category="events" />
      </Route>
      <Route exact path="/events/:docId">
        <ContentItem />
      </Route>
      <Route exact path="/news">
        <ContentCollection category="news" />
      </Route>
      <Route exact path="/news/:docId">
        <ContentItem />
      </Route>
      <Route exact path="/what-we-do">
        <ContentItem docId="what-we-do">
          <PostBrowser />
        </ContentItem>
      </Route>
      <Route exact path="/find-your-state" component={FindYourState} />
      <Route exact path="/why-we-pray">
        <ContentItem docId="why-we-pray" />
      </Route>
      <Route exact path="/womens-ministry">
        <ContentItem docId="womens-ministry" />
      </Route>
      <Route exact path="/give">
        <ContentItem docId="give" />
      </Route>
      <Route exact path="/updates" component={Updates} />
      <Route exact path="/content/edit/:docId" component={ContentEdit} />
      <Route exact path="/content/new" component={ContentNew} />
      <Route exact path="/content" component={Content} />
      <Route exact path="/leader/:id" component={Leader} />
      <Route exact path="/states/:stateCode/leaders" component={StateLeaders} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route
        exact
        path="/sign-in/email-link-landing"
        component={SignInEmailLinkLanding}
      />
      <Route exact path="/sign-out" component={SignOut} />
      <Route component={Footer} />
    </Router>
  )
}

export default App

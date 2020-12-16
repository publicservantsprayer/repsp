import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './screens/Home'
import Leader from './screens/Leader'
import ContentItem from './screens/ContentItem'
import FindYourState from './screens/FindYourState'
import Content from './Content'
import ContentEdit from './Content/Edit'
import ContentNew from './Content/New'
import MattsUpdates from './screens/MattsUpdates'
import SignIn from './screens/SignIn'
import SignInEmailLinkLanding from './SignIn/EmailLinkLanding'
import Profile from './screens/Profile'
import SignOut from './SignIn/SignOut'
import PostBrowser from './PostBrowser'
import TwitterAccounts from './screens/TwitterAccounts'
import ContentCollection from './screens/ContentCollection'
import Data from './screens/Data'
import StyleGuide from './StyleGuide'
import useUSAState from './utilities/useUSAState'
import DesktopOnly from './DesktopOnly'
import { useSnackbar } from 'notistack'
import { environment } from './utilities/environment'

const StateFinder = () => {
  useUSAState({ useGeoCode: true })
  return null
}

export default function App() {
  const { enqueueSnackbar } = useSnackbar()
  if (environment === 'staging') enqueueSnackbar('Staging Environment', { variant: 'info' })

  return (
    <Router>
      <Route component={StateFinder} />
      <Switch>
        <Route exact path="/" component={Home} />

        {/* States */}
        <Route exact path="/states/:stateCode" component={Home} />
        <Route exact path="/states/:stateCode/:year/:month/:day" component={Home} />
        <Route exact path="/leader/:id" component={Leader} />
        <Route exact path="/find-your-state" component={FindYourState} />

        {/* Content Collection */}
        <Route exact path="/articles">
          <ContentCollection category="articles" />
        </Route>
        <Route exact path="/events">
          <ContentCollection category="events" />
        </Route>
        <Route exact path="/updates" component={MattsUpdates} />

        {/* Dynamic Content Items */}
        <Route exact path="/articles/:docId" component={ContentItem} />
        <Route exact path="/events/:docId" component={ContentItem} />

        {/* Static Content Items */}
        <Route exact path="/what-we-do">
          <ContentItem docId="what-we-do">
            <DesktopOnly>
              <PostBrowser />
            </DesktopOnly>
          </ContentItem>
        </Route>
        <Route exact path="/why-we-pray">
          <ContentItem docId="why-we-pray" />
        </Route>
        <Route exact path="/women">
          <ContentItem docId="womens-ministry" />
        </Route>
        <Route exact path="/give">
          <ContentItem docId="give" />
        </Route>
        <Route exact path="/donate">
          <ContentItem docId="give" />
        </Route>
        <Route exact path="/our-partners">
          <ContentItem docId="our-partners" />
        </Route>
        <Route exact path="/privacy-policy">
          <ContentItem docId="privacy-policy" />
        </Route>
        <Route exact path="/about">
          <ContentItem docId="about" />
        </Route>

        {/* Admin */}
        <Route exact path="/style-guide" component={StyleGuide} />
        <Route exact path="/content/edit/:docId" component={ContentEdit} />
        <Route exact path="/content/new" component={ContentNew} />
        <Route exact path="/content" component={Content} />
        <Route exact path="/twitter-accounts" component={TwitterAccounts} />
        <Route exact path="/twitter-accounts/:accountName" component={TwitterAccounts} />
        <Route exact path="/data" component={Data} />

        {/* Account */}
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-in/email-link-landing" component={SignInEmailLinkLanding} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/sign-out" component={SignOut} />
      </Switch>
    </Router>
  )
}

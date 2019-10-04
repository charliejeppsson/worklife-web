import React from 'react'
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom'

import NavBar from './components/nav/NavBar/NavBar'
import SpacesHome from './components/spaces/SpacesHome/SpacesHome'
import MyBookingsHome from './components/spaces/MyBookingsHome/MyBookingsHome'
import NewsHome from './components/community/news/NewsHome/NewsHome'
import NewsDetails from './components/community/news/NewsDetails/NewsDetails'
import EventsHome from './components/community/events/EventsHome/EventsHome'
import EventDetails from './components/community/events/EventDetails/EventDetails'
import CollabsHome from './components/community/collabs/CollabsHome/CollabsHome'
import CollabDetails from './components/community/collabs/CollabDetails/CollabDetails'
import BenefitsHome from './components/benefits/BenefitsHome'
import StartHome from './components/start/StartHome'

export default function App(props) {
  const { accessToken, currentUser, error } = props
  const NavWithRouter = withRouter(NavBar)

  return (
    <BrowserRouter>
      {
        accessToken && currentUser && !error ? (
          <React.Fragment>
            <NavWithRouter />
            <Switch>
              {/* Community */} 
              <Redirect exact from="/login" to="/community/news" />
              <Redirect exact from="/" to="/community/news" />
              <Redirect exact from="/community" to="/community/news" />

              <Route path="/community/news" component={NewsHome} />
              <Route exact path="/community/news/:id" component={NewsDetails} />

              <Route path="/community/events" component={EventsHome} />
              <Route exact path="/community/events/:id" component={EventDetails} />
              
              <Route path="/community/collabs" component={CollabsHome} />
              <Route exact path="/community/collabs/:id" component={CollabDetails} />

              {/* Spaces */}
              <Redirect exact from="/spaces" to="/spaces/new-booking" />

              <Route path="/spaces/new-booking" component={SpacesHome} />
              <Route path="/spaces/my-bookings" component={MyBookingsHome} />

              {/* Benefits */}
              <Route path="/benefits" component={BenefitsHome} />
            </Switch>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Redirect to="/login" />
            <Route path="/login" component={StartHome} />
          </React.Fragment>
        )
      }
    </BrowserRouter>
  )
}

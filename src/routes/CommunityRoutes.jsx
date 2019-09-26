import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import NewsHome from '../components/community/news/NewsHome'
import NewsDetails from '../components/community/news/NewsDetails'
import EventsHome from '../components/community/events/EventsHome'
import EventDetails from '../components/community/events/EventDetails'
import CollabsHome from '../components/community/collabs/CollabsHome'
import CollabDetails from '../components/community/collabs/CollabDetails'

export default function CommunityRoutes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/community/news" />
      <Redirect exact from="/community" to="/community/news" />

      <Route exact path="/community/news" component={NewsHome} />
      <Route exact path="/community/news/:id" component={NewsDetails} />

      <Route exact path="/community/events" component={EventsHome} />
      <Route exact path="/community/events/:id" component={EventDetails} />
      
      <Route exact path="/community/collabs" component={CollabsHome} />
      <Route exact path="/community/collabs/:id" component={CollabDetails} />
    </Switch>
  )
}

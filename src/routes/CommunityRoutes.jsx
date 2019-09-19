import React from 'react'
import { Route } from 'react-router-dom'

import CommunityHome from '../components/community/CommunityHome'
import NewsHome from '../components/community/news/NewsHome'
import NewsDetails from '../components/community/news/NewsDetails'
import EventsHome from '../components/community/events/EventsHome'
import EventDetails from '../components/community/events/EventDetails'
import CollabsHome from '../components/community/collabs/CollabsHome'
import CollabDetails from '../components/community/collabs/CollabDetails'

export default function CommunityRoutes() {
  return (
    <React.Fragment>
      <Route path="/community" component={CommunityHome} />
      <Route path="/community/news" component={NewsHome} />
      <Route path="/community/news/:id" component={NewsDetails} />

      <Route exact path="/community/events" component={EventsHome} />
      <Route exact path="/community/events/:id" component={EventDetails} />
      
      <Route exact path="/community/collabs" component={CollabsHome} />
      <Route exact path="/community/collabs/:id" component={CollabDetails} />
    </React.Fragment>
  )
}

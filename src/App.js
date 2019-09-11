import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'

import './App.scss'
import Header from './components/Header'
import CommunityHome from './components/community/CommunityHome'
import NewsHome from './components/community/NewsHome'
import EventsHome from './components/community/EventsHome'
import CollabsHome from './components/community/CollabsHome'
import SpacesHome from './components/spaces/SpacesHome'
import NewBookingHome from './components/spaces/NewBookingHome'
import MyBookingsHome from './components/spaces/MyBookingsHome'
import BenefitsHome from './components/benefits/BenefitsHome'
import AccountHome from './components/account/AccountHome'

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
  })
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Route exact path="/" component={CommunityHome} />
        <Route exact path="/community" component={CommunityHome} />

        <Route path="/community/news" component={NewsHome} />
        <Route path="/community/events" component={EventsHome} />
        <Route path="/community/collabs" component={CollabsHome} />

        <Route exact path="/spaces" component={SpacesHome} />
        <Route path="/spaces/new-booking" component={NewBookingHome} />
        <Route path="/spaces/my-bookings" component={MyBookingsHome} />

        <Route path="/benefits" component={BenefitsHome} />
        <Route path="/account" component={AccountHome} />
        <Route path="/logout" component={AccountHome} />
      </Router>
    </ApolloProvider>
  )
}

export default App

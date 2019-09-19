import React from 'react'
import { Route } from 'react-router-dom'

import SpacesHome from '../components/spaces/SpacesHome'
import NewBookingHome from '../components/spaces/NewBookingHome'
import MyBookingsHome from '../components/spaces/MyBookingsHome'

export default function CommunityRoutes() {
  return (
    <React.Fragment>
      <Route exact path="/spaces" component={SpacesHome} />
      <Route exact path="/spaces/new-booking" component={NewBookingHome} />
      <Route exact path="/spaces/my-bookings" component={MyBookingsHome} />
    </React.Fragment>
  )
}

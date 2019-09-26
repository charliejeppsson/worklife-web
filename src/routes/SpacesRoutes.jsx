import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import SpacesHome from '../components/spaces/SpacesHome'
import MyBookingsHome from '../components/spaces/MyBookingsHome'

export default function CommunityRoutes() {
  return (
    <Switch>
      <Redirect exact from="/spaces" to="/spaces/new-booking" />

      <Route exact path="/spaces/new-booking" component={SpacesHome} />
      <Route exact path="/spaces/my-bookings" component={MyBookingsHome} />
    </Switch>
  )
}

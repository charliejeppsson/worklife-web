import React from 'react'
import { Route } from 'react-router-dom'

import AccountHome from '../components/account/AccountHome'

export default function AccountRoutes() {
  return (
    <React.Fragment>
      <Route exact path="/account" component={AccountHome} />
    </React.Fragment>
  )
}

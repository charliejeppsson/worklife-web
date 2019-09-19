import React from 'react'
import { Route } from 'react-router-dom'

import BenefitsHome from '../components/benefits/BenefitsHome'

export default function BenefitsRoutes() {
  return (
    <React.Fragment>
      <Route exact path="/benefits" component={BenefitsHome} />
    </React.Fragment>
  )
}

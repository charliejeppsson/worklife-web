import React from 'react'
import { NavLink } from 'react-router-dom'

import './PrimaryNav.scss'

export default function PrimaryNav() {
  return (
    <div className="PrimaryNav">
      <NavLink to="/community" activeClassName="text-underscore">
        Community
      </NavLink>

      <NavLink to="/spaces" activeClassName="text-underscore">
        Spaces
      </NavLink>

      <NavLink to="/benefits" activeClassName="text-underscore">
        Benefits
      </NavLink>
    </div>
  )
}

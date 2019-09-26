import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import NavContext from '../../context/navContext'

export default function PrimaryNav() {
  const { setActiveNav } = useContext(NavContext)

  return (
    <div className="NavBar__primary-links">
      <NavLink
        to="/community"
        onClick={() => setActiveNav('/community/news')}
        activeClassName="text-underscore"
      >
        Community
      </NavLink>

      <NavLink
        to="/spaces"
        onClick={() => setActiveNav('/spaces/new-booking')}
        activeClassName="text-underscore"
      >
        Spaces
      </NavLink>

      <NavLink
        to="/benefits"
        onClick={() => setActiveNav('/benefits')}
        activeClassName="text-underscore"
      >
        Benefits
      </NavLink>
    </div>
  )
}

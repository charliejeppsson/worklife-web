import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import NavContext from '../../../context/navContext'
import './SpacesSubNav.scss'

export default function SpacesSubNav() {
  const { activeNav, setActiveNav } = useContext(NavContext)

  if (activeNav.slice(0, 7) === '/spaces') {
    return (
      <div className="SpacesSubNav">
        <NavLink
          to="/spaces/new-booking"
          onClick={() => setActiveNav('/spaces/new-booking')}
          isActive={() => activeNav === '/spaces/new-booking'}
          activeClassName="text-underscore"
        >
          Book spaces
        </NavLink> 

        <NavLink
          to="/spaces/my-bookings"
          onClick={() => setActiveNav('/spaces/my-bookings')}
          isActive={() => activeNav === '/spaces/my-bookings'}
          activeClassName="text-underscore"
        >
          My bookings
        </NavLink> 
      </div>
    )
  }
  return null
}

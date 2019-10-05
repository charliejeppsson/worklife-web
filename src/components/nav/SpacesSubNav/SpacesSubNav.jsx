import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './SpacesSubNav.scss'

export default function SpacesSubNav({ activeNav }) {
  if (activeNav.slice(0, 7) === '/spaces') {
    return (
      <div className="SpacesSubNav">
        <NavLink
          to="/spaces/new-booking"
          isActive={() => activeNav === '/spaces/new-booking'}
          activeClassName="text-underscore"
        >
          Book spaces
        </NavLink> 

        <NavLink
          to="/spaces/my-bookings"
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

SpacesSubNav.propTypes = {
  activeNav: PropTypes.string
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './CommunitySubNav.scss'

export default function CommunitySubNav({ activeNav }) {
  if (activeNav.slice(0, 10) === '/community') {
    return (
      <div className="CommunitySubNav">
        <NavLink
          to="/community/news"
          isActive={() => activeNav === '/community/news'}
          activeClassName="text-underscore"
        >
          News
        </NavLink> 

        <NavLink
          to="/community/events"
          isActive={() => activeNav === '/community/events'}
          activeClassName="text-underscore"
        >
          Events
        </NavLink> 

        <NavLink
          to="/community/collabs"
          isActive={() => activeNav === '/community/collabs'}
          activeClassName="text-underscore"
        >
          Collabs
        </NavLink> 
      </div>
    )
  }
  return null
}

CommunitySubNav.propTypes = {
  activeNav: PropTypes.string
}

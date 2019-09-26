import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import NavContext from '../../context/navContext'

export default function CommunitySubNav() {
  const { activeNav, setActiveNav } = useContext(NavContext)

  if (activeNav.slice(0, 10) === '/community') {
    return (
      <div className="NavBar__secondary-links">
        <NavLink
          to="/community/news"
          onClick={() => setActiveNav('/community/news')}
          isActive={() => activeNav === '/community/news'}
          activeClassName="text-underscore"
        >
          News
        </NavLink> 

        <NavLink
          to="/community/events"
          onClick={() => setActiveNav('/community/events')}
          isActive={() => activeNav === '/community/events'}
          activeClassName="text-underscore"
        >
          Events
        </NavLink> 

        <NavLink
          to="/community/collabs"
          onClick={() => setActiveNav('/community/collabs')}
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

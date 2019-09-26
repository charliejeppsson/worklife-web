import React, { useState, useContext } from 'react'
import { withApollo } from 'react-apollo'

import AuthContext from '../../context/authContext'
import logoHorizontal from '../../assets/images/worklife-logo-2.png'
import PrimaryNav from './PrimaryNav'
import CommunitySubNav from './CommunitySubNav'
import SpacesSubNav from './SpacesSubNav'
import DropdownMenu from './DropdownMenu'

export default function NavBar() {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const { currentUser } = useContext(AuthContext)

  // Provide client to DropdownMenu
  const DropdownWithClient = withApollo(DropdownMenu)

  return (
    <nav className="NavBar__container">
      <img className="NavBar__logo" src={logoHorizontal} alt="Logo"/>

      <div className="NavBar__links">
        <PrimaryNav />
        <CommunitySubNav />
        <SpacesSubNav />
      </div>

      <div className="NavBar__avatar">
        <button onClick={() => setShowDropdownMenu(!showDropdownMenu)}>
          <img src={currentUser.avatar} alt="Current user"/>
        </button>
      </div>
      
      {showDropdownMenu && <DropdownWithClient />}
    </nav> 
  )
}

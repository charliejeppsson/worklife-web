import React, { useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import AuthContext from '../../../context/authContext'
import logoHorizontal from '../../../assets/images/worklife-logo-2.png'
import PrimaryNav from '../PrimaryNav/PrimaryNav'
import CommunitySubNav from '../CommunitySubNav/CommunitySubNav'
import SpacesSubNav from '../SpacesSubNav/SpacesSubNav'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import useOutsideClick from '../../../utils/useOutsideClick'
import './NavBar.scss'

export default function NavBar(props) {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef, () => setShowDropdownMenu(false))

  return (
    <nav className="NavBar__container">
      <img className="NavBar__logo" src={logoHorizontal} alt="Logo"/>

      <div className="NavBar__links">
        <PrimaryNav />
        <CommunitySubNav activeNav={props.location.pathname} />
        <SpacesSubNav activeNav={props.location.pathname} />
      </div>

      <div className="NavBar__avatar">
        <button onClick={() => setShowDropdownMenu(!showDropdownMenu)}>
          <img src={currentUser.avatar} alt="Current user"/>
        </button>
      </div>
      
      {showDropdownMenu && <DropdownMenu wrapperRef={wrapperRef} />}
    </nav> 
  )
}

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

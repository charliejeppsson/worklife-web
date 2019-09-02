import React from 'react'
import { Link } from 'react-router-dom'
import logoHorizontal from '../assets/images/convendum-logo-horizontal.png'

function NavBar() {
  return (
    <nav class="NavBar-container">
      <img class="NavBar-logo" src={logoHorizontal} />

      <div class="NavBar-links">
        <Link to="/news">NEWS</Link>
        <Link to="/community">COMMUNITY</Link>
        <Link to="/conference">CONFERENCE</Link>
        <Link to="/selection">SELECTION</Link>
      </div>
    </nav>
  )
}

export default NavBar

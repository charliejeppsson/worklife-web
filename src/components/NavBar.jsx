import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoHorizontal from '../assets/images/worklife-logo-1.png'

const currentUser = {
  firstName: 'Charlie',
  lastName: 'Jeppsson',
  avatar:
    'https://res.cloudinary.com/convendum/image/upload/v1564926762/p98utcvtcuxfsqopqcse.jpg'
}

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdownMenu: false,
      activeNav: window.location.pathname
    }
  }

  toggleDropdownMenu() {
    this.setState(state => ({ showDropdownMenu: !state.showDropdownMenu }))
  }

  isNewsNavActive(match, location) {
    switch (location.pathname) {
      case '/':
      case '/community':
      case '/community/news':
        return true
      default:
        return false
    }
  }

  showCommunitySubNav() {
    return this.state.activeNav.slice(0, 10) === '/' ||
    this.state.activeNav.slice(0, 10) === '/community'
  }

  showSpacesSubNav() {
    return this.state.activeNav.slice(0, 10) === '/spaces'
  }

  renderPrimaryNav() {
    return (
      <div className="NavBar__primary-links">
        <NavLink
          to="/community"
          onClick={() => this.setState(state => ({ activeNav: '/community' }))}
          activeClassName="text-underscore"
        >
          COMMUNITY
        </NavLink>

        <NavLink
          to="/spaces"
          onClick={() => this.setState(state => ({ activeNav: '/spaces' }))}
          activeClassName="text-underscore"
        >
          SPACES
        </NavLink>

        <NavLink
          to="/benefits"
          onClick={() => this.setState(state => ({ activeNav: 'benefits' }))}
          activeClassName="text-underscore"
        >
          BENEFITS
        </NavLink>
      </div>
    )
  }

  renderCommunitySubNav() {
    return (
      <div className="NavBar__secondary-links">
        <NavLink
          to="/community/news"
          isActive={(match, location) => this.isNewsNavActive(match, location)}
          activeClassName="text-underscore"
        >
          NEWS
        </NavLink> 

        <NavLink
          to="/community/events"
          activeClassName="text-underscore"
        >
          EVENTS
        </NavLink> 

        <NavLink
          to="/community/collabs"
          activeClassName="text-underscore"
        >
          COLLABS
        </NavLink> 
      </div>
    )
  }

  renderSpacesSubNav() {
    return (
      <div className="NavBar__secondary-links">
        <NavLink
          to="/spaces/new-booking"
          activeClassName="text-underscore"
        >
          BOOK SPACES
        </NavLink> 

        <NavLink
          to="/spaces/my-bookings"
          activeClassName="text-underscore"
        >
          MY BOOKINGS
        </NavLink> 
      </div>
    )
  }

  render() {
    return (
      <nav className="NavBar__container">
        <img className="NavBar__logo" src={logoHorizontal} />

        <div className="NavBar__links">
          {this.renderPrimaryNav()}
          {this.showCommunitySubNav() ? this.renderCommunitySubNav() : null}
          {this.showSpacesSubNav() ? this.renderSpacesSubNav() : null}
        </div>

        <div className="NavBar__avatar">
          <a href="#" onClick={() => this.toggleDropdownMenu()}>
            <img src={currentUser.avatar} />
          </a>
        </div>

        {this.state.showDropdownMenu ? (
          <div className="NavBar__dropdown">
            <Link to="/account">Account</Link>
            <Link to="/logout">Log out</Link>
          </div>
        ) : null}
      </nav>
    )
  }
}

export default NavBar

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoHorizontal from '../assets/images/worklife-logo-2.png'

const currentUser = {
  firstName: 'Charlie',
  lastName: 'Jeppsson',
  avatar:
    'https://res.cloudinary.com/convendum/image/upload/v1564926762/p98utcvtcuxfsqopqcse.jpg'
}

export default class NavBar extends React.Component {
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
          Community
        </NavLink>

        <NavLink
          to="/spaces"
          onClick={() => this.setState(state => ({ activeNav: '/spaces' }))}
          activeClassName="text-underscore"
        >
          Spaces
        </NavLink>

        <NavLink
          to="/benefits"
          onClick={() => this.setState(state => ({ activeNav: 'benefits' }))}
          activeClassName="text-underscore"
        >
          Benefits
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
          News
        </NavLink> 

        <NavLink
          to="/community/events"
          activeClassName="text-underscore"
        >
          Events
        </NavLink> 

        <NavLink
          to="/community/collabs"
          activeClassName="text-underscore"
        >
          Collabs
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
          Book spaces
        </NavLink> 

        <NavLink
          to="/spaces/my-bookings"
          activeClassName="text-underscore"
        >
          My bookings
        </NavLink> 
      </div>
    )
  }

  render() {
    return (
      <nav className="NavBar__container">
        <img className="NavBar__logo" src={logoHorizontal} alt="Logo"/>

        <div className="NavBar__links">
          {this.renderPrimaryNav()}
          {this.showCommunitySubNav() ? this.renderCommunitySubNav() : null}
          {this.showSpacesSubNav() ? this.renderSpacesSubNav() : null}
        </div>

        <div className="NavBar__avatar">
          <button onClick={() => this.toggleDropdownMenu()}>
            <img src={currentUser.avatar} alt="Current user"/>
          </button>
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

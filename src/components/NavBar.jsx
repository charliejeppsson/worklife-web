import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { LOGOUT_MUTATION } from '../graphql/constants'
import AuthContext from '../context/authContext'
import logoHorizontal from '../assets/images/worklife-logo-2.png'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdownMenu: false,
      activeNav: window.location.pathname
    }
  }

  static contextType = AuthContext // Adds AuthContext to this.context 

  handleLogout() {
    this.context.setCurrentUserLoading(true)
    this.props.client.mutate({ mutation: LOGOUT_MUTATION })
      .then(res => {
        console.log('currentUser from logout mutation: ', res.data.logout.user)
        this.context.setCurrentUser(res.data.logout.user)
        this.context.setCurrentUserLoading(false)
      })
      .catch(err => {
        console.log('error from logout mutation: ', err)
        this.context.setCurrentUserLoading(false)
      })
  }

  toggleDropdownMenu() {
    this.setState(state => ({ showDropdownMenu: !state.showDropdownMenu }))
  }

  isNewsNavActive(match, location) {
    return location.pathname === '/' ||
      location.pathname === '/community' ||
      location.pathname.slice(0, 15) === '/community/news'
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
      <AuthContext.Consumer>
        {({ currentUser }) => (
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

                <button onClick={() => this.handleLogout()}>
                  Sign out 
                </button>
              </div>
            ) : null}
          </nav> 
        )}
      </AuthContext.Consumer>
    )
  }
}

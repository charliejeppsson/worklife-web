import React from 'react'

import { LOGIN_MUTATION } from '../../graphql/constants'
import AuthContext from '../../context/authContext'
import LoadingSpinner from '../LoadingSpinner'
import logoHorizontal from '../../assets/images/worklife-logo-2.png'

export default class StartHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
    }
  }

  static contextType = AuthContext // Adds AuthContext to this.context 

  handleLogin = (email, password) => {
    this.context.setCurrentUserLoading(true)
    this.props.client.mutate({
      variables: { email, password },
      mutation: LOGIN_MUTATION
    })
      .then(res => {
        console.log('currentUser from login mutation: ', res.data.login.user)
        this.context.setCurrentUser(res.data.login.user)
        this.context.setCurrentUserLoading(false)
      })
      .catch(err => {
        console.log('error from login mutation: ', err)
        this.context.setCurrentUserLoading(false)
      })
  }

  render() {
    const { email, password } = this.state
    if (this.context.currentUserLoading) { return <LoadingSpinner /> }
    return (
      <div className="StartHome__container">
        <img className="NavBar__logo" src={logoHorizontal} alt="Logo"/>

        <input
          id="email"
          type="email"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="Enter email address"
        />
        <input
          id="password"
          type="password"
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="Enter password"
        />
        
        <div className="flex mt3">
          <button onClick={() => this.handleLogin(email, password)}>
            Sign in
          </button>
        </div>
      </div>
    )
  }
}

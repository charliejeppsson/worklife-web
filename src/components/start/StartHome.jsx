import React from 'react'
import { withAlert } from 'react-alert'

import { LOGIN_MUTATION } from '../../graphql/constants'
import AuthContext from '../../context/authContext'
import LoadingSpinner from '../LoadingSpinner'
import logoHorizontal from '../../assets/images/worklife-logo-2.png'

class StartHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
    }
  }

  static contextType = AuthContext // Adds AuthContext to this.context 

  handleLogin = (email, password) => {
    if (!email && !password) {
      this.props.alert.show('Both email and password must be provided.')
      return
    }
    this.context.setAuthLoading(true)
    this.props.client.mutate({
      variables: { email, password },
      mutation: LOGIN_MUTATION,
      errorPolicy: 'all'
    })
      .then(res => {
        if (res.errors) {
          console.log('res.error from login mutation: ', res.errors[0].message)
          this.props.alert.show(res.errors[0].message)
        } else {
          console.log('currentUser from login mutation: ', res.data.login.user)
          this.context.setCurrentUser(res.data.login.user)
          localStorage.setItem('accessToken', res.data.login.accessToken)
        }
        this.context.setAuthLoading(false)
      })
      .catch(err => {
        console.log('err from login mutation: ', err)
        this.context.setAuthLoading(false)
      })
  }

  render() {
    const { email, password } = this.state
    if (this.context.authLoading) { return <LoadingSpinner /> }
    return (
      <div className="StartHome__container">
        <div className="StartHome__form">
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
          
          <button onClick={() => this.handleLogin(email, password)}>
            Sign in
          </button>
        </div>
      </div>
    )
  }
}

export default withAlert()(StartHome)

import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { LOGIN_MUTATION } from '../../graphql/constants'
import AuthContext from '../../context/authContext'
import NavContext from '../../context/navContext'
import LoadingSpinner from '../LoadingSpinner'
import logoHorizontal from '../../assets/images/worklife-logo-2.png'

export default function StartHome(props) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { authLoading, setAuthLoading, setCurrentUser } = useContext(AuthContext)
  const { setActiveNav } = useContext(NavContext)
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  const handleLogin = () => {
    if (!email && !password) {
      props.alert.show('Both email and password must be provided.')
      return
    }
    setAuthLoading(true)
    login({ variables: { email, password }, errorPolicy: 'all' })
      .then(res => {
        if (res.errors) {
          console.log('res.error from login mutation: ', res.errors[0].message)
          props.alert.show(res.errors[0].message)
        } else {
          console.log('currentUser from login mutation: ', res.data.login.user)
          setCurrentUser(res.data.login.user)
          localStorage.setItem('accessToken', res.data.login.accessToken)
        }
        setAuthLoading(false)
        setActiveNav('/community/news')
      })
      .catch(err => {
        console.log('err from login mutation: ', err)
        setAuthLoading(false)
      })
  }

  if (authLoading) { return <LoadingSpinner /> }
  return (
    <div className="StartHome__container">
      <div className="StartHome__form">
        <img className="NavBar__logo" src={logoHorizontal} alt="Logo"/>

        <input
          id="email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email address"
        />

        <input
          id="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        
        <button onClick={() => handleLogin()}>
          Sign in
        </button>
      </div>
    </div>
  )
}

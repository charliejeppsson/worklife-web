import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'

import { LOGIN_MUTATION } from '../../graphql/constants'
import AuthContext from '../../context/authContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import logoHorizontal from '../../assets/images/worklife-logo-2.png'
import './StartHome.scss'

export default function StartHome() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { authLoading, setAuthLoading, setCurrentUser } = useContext(AuthContext)
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)
  const alert = useAlert()

  const handleLogin = () => {
    if (!email && !password) {
      alert.show('Both email and password must be provided.')
      return
    }
    setAuthLoading(true)
    login({ variables: { email, password }, errorPolicy: 'all' })
      .then(res => {
        if (res.errors) {
          console.log('res.error from login mutation: ', res.errors[0].message)
          alert.show(res.errors[0].message)
        } else {
          console.log('currentUser from login mutation: ', res.data.login.user)
          setCurrentUser(res.data.login.user)
          localStorage.setItem('accessToken', res.data.login.accessToken)
        }
        setAuthLoading(false)
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

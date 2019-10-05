import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import { LOGOUT_MUTATION } from '../../../graphql/constants'
import AuthContext from '../../../context/authContext'
import './DropdownMenu.scss'

export default function DropdownMenu() {
  const { setCurrentUser, setAuthLoading } = useContext(AuthContext)
  const [logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION)
  const client = useApolloClient()

  const handleLogout = () => {
    setAuthLoading(true)
    return logout()
      .then(res => {
        localStorage.removeItem('accessToken')
        setCurrentUser(res.data.logout.user)
        setAuthLoading(false)
        client.resetStore() // Reset Apollo query cache
      })
      .catch(err => {
        console.log('error from logout mutation: ', err)
        setAuthLoading(false)
      })
  }

  return (
    <div className="DropdownMenu">
      <Link to="/account">Account</Link>

      <button onClick={() => handleLogout()}>
        Sign out 
      </button>
    </div>
  )
}

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

import { LOGOUT_MUTATION } from '../../../graphql/constants'
import AuthContext from '../../../context/authContext'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import './DropdownMenu.scss'

export default function DropdownMenu(props) {
  const { setCurrentUser, setAuthLoading } = useContext(AuthContext)
  const [logout, { loading, error }] = useMutation(LOGOUT_MUTATION)
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

  if (loading) { return <li className="DropdownMenu"><LoadingSpinner /></li> }
  if (error) { return alert.show('An error occurred.') }

  return (
    <div ref={props.wrapperRef} className="DropdownMenu">
      <Link to="/account">Account</Link>

      <button onClick={() => handleLogout()}>
        Sign out 
      </button>
    </div>
  )
}

DropdownMenu.propTypes = {
  wrapperRef: PropTypes.object
}

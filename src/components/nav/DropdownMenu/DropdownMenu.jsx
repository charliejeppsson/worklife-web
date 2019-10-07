import React, { useContext } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

import { LOGOUT_MUTATION } from '../../../graphql/mutations/auth'
import AuthContext from '../../../context/authContext'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import './DropdownMenu.scss'

export default function DropdownMenu(props) {
  const { currentUser, setCurrentUser, setAuthLoading } = useContext(AuthContext)
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
      <div className="DropdownMenu__user-info">
        <p>{currentUser.firstName} {currentUser.lastName}</p>
        <p className="DropdownMenu__user-info__sub-info">{currentUser.title}</p>
      </div>

      <button onClick={() => handleLogout()}>
        Sign out 
      </button>
    </div>
  )
}

DropdownMenu.propTypes = {
  wrapperRef: PropTypes.object
}

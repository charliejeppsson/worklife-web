import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { LOGOUT_MUTATION } from '../../graphql/constants'
import AuthContext from '../../context/authContext'

export default function DropdownMenu(props) {
  const { setCurrentUser, setAuthLoading } = useContext(AuthContext)

  function handleLogout() {
    setAuthLoading(true)
    return props.client.mutate({ mutation: LOGOUT_MUTATION })
      .then(res => {
        console.log('currentUser from logout mutation: ', res.data.logout.user)
        localStorage.removeItem('accessToken')
        setCurrentUser(res.data.logout.user)
        setAuthLoading(false)
        props.client.resetStore() // Reset Apollo query cache
      })
      .catch(err => {
        console.log('error from logout mutation: ', err)
        setAuthLoading(false)
      })
  }

  return (
    <div className="NavBar__dropdown">
      <Link to="/account">Account</Link>

      <button onClick={() => handleLogout()}>
        Sign out 
      </button>
    </div>
  )
}

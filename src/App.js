import React, { useState, useEffect } from 'react'

import AuthContext from './context/authContext'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import Router from './Router'
import './App.scss'

export default function App(props) {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => { authenticateUser() }, [])

  const authenticateUser = () => {
    fetch("http://localhost:5000/api/v1/authenticate", {
      method: "POST",
      credentials: "include"
    })
      .then(async res => {
        const { accessToken, user } = await res.json()
        localStorage.setItem('accessToken', accessToken)
        setCurrentUser(user)
        setError(null)
        setLoading(false)
      })
      .catch(err => {
        console.log('error from login mutation: ', err)
        localStorage.setItem('accessToken', null)
        setCurrentUser({})
        setError(err)
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="App__container">
        <LoadingSpinner />
      </div>
    )
  } else {
    return (
      <AuthContext.Provider value={{
        currentUser,
        setCurrentUser: (currentUser) => setCurrentUser(currentUser),
        authLoading: loading,
        setAuthLoading: (loading) => setLoading(loading),
        authError: error,
        setAuthError: (error) =>  setError(error)
      }}>
        <Router
          accessToken={localStorage.getItem('accessToken')}
          currentUser={currentUser}
          error={error}
        />
      </AuthContext.Provider>
    )
  }
}

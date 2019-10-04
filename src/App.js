import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import './App.scss'
import AuthContext from './context/authContext'
import NavContext from './context/navContext'
import LoadingSpinner from './components/LoadingSpinner'
import NavBar from './components/nav/NavBar/NavBar'
import StartHome from './components/start/StartHome'
import CommunityRoutes from './routes/CommunityRoutes'
import SpacesRoutes from './routes/SpacesRoutes'
import BenefitsRoutes from './routes/BenefitsRoutes'

export default function App(props) {
  const [activeNav, setActiveNav] = useState('/community/news')
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

  const accessToken = localStorage.getItem('accessToken')

  if (loading) {
    return (
      <div className="body__container">
        <LoadingSpinner />
      </div>
    )
  } else {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          currentUser,
          setCurrentUser: (currentUser) => setCurrentUser(currentUser),
          authLoading: loading,
          setAuthLoading: (loading) => setLoading(loading),
          authError: error,
          setAuthError: (error) =>  setError(error)
        }}>
          <NavContext.Provider value={{
            activeNav,
            setActiveNav: (activeNav) => setActiveNav(activeNav)
          }}>
            <Switch>
              {
                accessToken && currentUser && !error ? (
                  <React.Fragment>
                    <NavBar />
                    <Redirect exact from="/login" to="/community/news" />
                    <CommunityRoutes />
                    <SpacesRoutes />
                    <BenefitsRoutes />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Redirect to="/login" exact />
                    <Route exact path="/login" component={StartHome} />
                  </React.Fragment>
                )
              }
            </Switch>  
          </NavContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    )
  }
}

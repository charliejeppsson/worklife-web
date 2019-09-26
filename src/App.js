import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import './App.scss'
import AuthContext from './context/authContext'
import LoadingSpinner from './components/LoadingSpinner'
import NavBar from './components/NavBar'
import StartHome from './components/start/StartHome'
import CommunityRoutes from './routes/CommunityRoutes'
import SpacesRoutes from './routes/SpacesRoutes'
import BenefitsRoutes from './routes/BenefitsRoutes'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    this.authenticateUser()
  }

  authenticateUser = () => {
    fetch("http://localhost:5000/api/v1/authenticate", {
      method: "POST",
      credentials: "include"
    })
      .then(async res => {
        const { accessToken, user } = await res.json()
        localStorage.setItem('accessToken', accessToken)
        this.setState({ currentUser: user, loading: false })
      })
      .catch(err => {
        console.log('error from login mutation: ', err)
        this.context.setAuthError(err)
        this.context.setAuthLoading(false)
      })
  }

  render() {
    const accessToken = localStorage.getItem('accessToken')
    const { currentUser, loading, error } = this.state
    const NavBarWithClient = withApollo(NavBar) // Provide client to NavBar
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
            setCurrentUser: (currentUser) => this.setState({ currentUser }),
            authLoading: loading,
            setAuthLoading: (loading) => this.setState({ loading }),
            authError: error,
            setAuthError: (error) =>  this.setState({ error })
          }}>
              <Switch>
                {
                  accessToken && currentUser && !error ? (
                    <React.Fragment>
                      <NavBarWithClient />
                      <Redirect exact from="/login" to="/community/news" />
                      <CommunityRoutes />
                      <SpacesRoutes />
                      <BenefitsRoutes />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Redirect to="/login" exact />
                      <Route exact path="/login" component={withApollo(StartHome)} />
                    </React.Fragment>
                  )
                }
              </Switch>  
          </AuthContext.Provider>
        </BrowserRouter>
      )
    }
  }
}

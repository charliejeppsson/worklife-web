import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthContext from './context/authContext'

import './App.scss'
import { CURRENT_USER, LOGIN, LOGOUT } from './graphql/constants'
import LoadingSpinner from './components/LoadingSpinner'
import Header from './components/Header'
import StartHome from './components/start/StartHome'
import CommunityHome from './components/community/CommunityHome'
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
    this.getCurrentUser()
  }

  getCurrentUser = () => {
    const { client } = this.props
    client.query({ query: CURRENT_USER })
      .then(res => {
        console.log('currentUser from currentUser query: ', res.data.currentUser)
        this.setState({
          currentUser: res.data.currentUser,
          loading: false
        })
      })
  }

  handleLogin = (email, password) => {
    this.setState({ loading: true })
    const { client } = this.props
    client.mutate({ variables: { email, password }, mutation: LOGIN })
      .then(res => {
        console.log('currentUser from login mutation: ', res.data.login.user)
        this.setState({ currentUser: res.data.login.user, loading: false })
      })
  }

  handleLogout = () => {
    this.setState({ loading: true })
    const { client } = this.props
    client.mutate({ mutation: LOGOUT })
      .then(res => {
        console.log('currentUser from logout mutation: ', res.data.logout.user)
        this.setState({ currentUser: res.data.logout.user, loading: false })
      })
  }

  render() {
    const { currentUser, loading } = this.state

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
            login: this.handleLogin,
            logout: this.handleLogout
          }}>
            <Switch>
              {
                currentUser.id ? (
                  <React.Fragment>
                    <Header />
                    <Redirect from="/login" to="/" exact />
                    <Route exact path="/" component={CommunityHome} />
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
          </AuthContext.Provider>
        </BrowserRouter>
      )
    }
  }
}

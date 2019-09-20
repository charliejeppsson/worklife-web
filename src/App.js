import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import './App.scss'
import { CURRENT_USER_QUERY } from './graphql/constants'
import AuthContext from './context/authContext'
import LoadingSpinner from './components/LoadingSpinner'
import NavBar from './components/NavBar'
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
    client.query({ query: CURRENT_USER_QUERY })
      .then(res => {
        console.log('currentUser from currentUser query: ', res.data.currentUser)
        this.setState({ currentUser: res.data.currentUser, loading: false })
      })
      .catch(err => {
        console.log('error from currentUser query: ', err)
        this.setState({ loading: false })
      })
  }

  render() {
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
            currentUserLoading: loading,
            setCurrentUserLoading: (loading) => this.setState({ loading }),
            currentUserError: error,
            setCurrentUserError: (error) =>  this.setState({ error })
          }}>
            <Switch>
              {
                currentUser.id ? (
                  <React.Fragment>
                    <NavBarWithClient />
                    <Redirect from="/login" to="/" exact />
                    <Route exact path="/" component={CommunityHome} />
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

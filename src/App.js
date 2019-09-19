import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import AuthContext from './context/authContext'
import gql from 'graphql-tag'

import './App.scss'
import LoadingSpinner from './components/LoadingSpinner'
import Header from './components/Header'
import StartHome from './components/start/StartHome'
import CommunityHome from './components/community/CommunityHome'
import NewsHome from './components/community/news/NewsHome'
import NewsDetails from './components/community/news/NewsDetails'
import EventsHome from './components/community/events/EventsHome'
import EventDetails from './components/community/events/EventDetails'
import CollabsHome from './components/community/collabs/CollabsHome'
import CollabDetails from './components/community/collabs/CollabDetails'
import SpacesHome from './components/spaces/SpacesHome'
import NewBookingHome from './components/spaces/NewBookingHome'
import MyBookingsHome from './components/spaces/MyBookingsHome'
import BenefitsHome from './components/benefits/BenefitsHome'
import AccountHome from './components/account/AccountHome'

export default class App extends Component {
  constructor(props) {
    super(props)
    console.log('PROPS: ', props)

    this.state = {
      currentUser: {},
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    const { client } = this.props
    client.query({
      query: gql`
        {
          currentUser {
            id
            firstName
            lastName
            email
            title
            avatar
          }
        }
      `
    })
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
    client.mutate({
      variables: { email, password },
      mutation: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user {
              id
              firstName
              lastName
              email
              title
              avatar
            }
          }
        }
      `
    })
      .then(res => {
        console.log('currentUser from login mutation: ', res.data.login.user)
        this.setState({ currentUser: res.data.login.user, loading: false })
      })
  }

  handleLogout = () => {
    this.setState({ loading: true })
    const { client } = this.props
    client.mutate({
      mutation: gql`
        mutation logout {
          logout {
            user {
              id
              firstName
              lastName
              email
              title
              avatar
            }
          }
        }
      `
    })
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
        <Router>
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
                    <Route path="/community" component={CommunityHome} />
                    <Route path="/community/news" component={NewsHome} />
                    <Route path="/community/news/:id" component={NewsDetails} />

                    <Route exact path="/community/events" component={EventsHome} />
                    <Route exact path="/community/events/:id" component={EventDetails} />
                    
                    <Route exact path="/community/collabs" component={CollabsHome} />
                    <Route exact path="/community/collabs/:id" component={CollabDetails} />

                    <Route exact path="/spaces" component={SpacesHome} />
                    <Route exact path="/spaces/new-booking" component={NewBookingHome} />
                    <Route exact path="/spaces/my-bookings" component={MyBookingsHome} />

                    <Route exact path="/benefits" component={BenefitsHome} />
                    <Route exact path="/account" component={AccountHome} />
                    <Route exact path="/logout" component={AccountHome} />
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
        </Router>
      )
    }
  }
}

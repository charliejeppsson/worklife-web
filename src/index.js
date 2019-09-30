import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { withApollo } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { transitions,  positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import './index.scss'
import App from './App'
import authTokenValidityLink from './apollo/authTokenValidityLink'

function ApolloContainer() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authTokenValidityLink
  })

  const AppWithClient = withApollo(App) // Provide client to App

  const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 8000,
    offset: '30px',
    transition: transitions.SCALE,
    type: 'error' 
  }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppWithClient />
          </MuiPickersUtilsProvider>
        </AlertProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<ApolloContainer />, document.getElementById('root'))




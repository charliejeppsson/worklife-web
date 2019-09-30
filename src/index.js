import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { transitions,  positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import './index.scss'
import App from './App'
import authTokenValidityLink from './graphql/authTokenValidityLink'

function ApolloContainer() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authTokenValidityLink
  })

  const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 8000,
    offset: '30px',
    transition: transitions.SCALE,
    type: 'error' 
  }

  return (
    <ApolloProvider client={client}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </AlertProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<ApolloContainer />, document.getElementById('root'))




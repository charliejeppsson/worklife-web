import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { withApollo } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import './index.scss'
import App from './App'
import authTokenValidityLink from './apollo/authTokenValidityLink'

function ApolloContainer() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authTokenValidityLink
  })

  const AppWithClient = withApollo(App) // Provide client to App

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AppWithClient />
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<ApolloContainer />, document.getElementById('root'))




import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { withApollo } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

import './index.scss'
import App from './App'

function ApolloContainer() {
  const link = createHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include'
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  })

  const AppContainer = withApollo(App)

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AppContainer />
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<ApolloContainer />, document.getElementById('root'))

import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink, Observable } from "apollo-link"
import { TokenRefreshLink } from "apollo-link-token-refresh"
import jwtDecode from "jwt-decode"

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = localStorage.getItem('accessToken')
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`
              }
            })
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      };
    })
)

const link = ApolloLink.from([
  // Config that triggers a request to the one traditional REST /authenticate
  // endpoint before each graphql IF the access token has expired. It will then
  // return a new one if the refreshToken (in the cookie) is still valid (just
  // like any /authenticate request). Without this, the user would have to
  // refresh the page every 15 minutes to refresh the access token.
  new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      // Meaning that when token is valid or undefined none of this logic is
      // needed. Only when it's expired.
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) { return true }

      try {
        const { exp } = jwtDecode(accessToken)
        const tokenNotExpired = Date.now() < exp * 1000
        if (!tokenNotExpired) { console.log('---- TOKEN HAS EXPIRED!!!!') }
        return tokenNotExpired
      } catch {
        return false
      }
    },
    fetchAccessToken: () => {
      return fetch("http://localhost:5000/api/v1/authenticate", {
        method: "POST",
        credentials: "include"
      })
    },
    handleFetch: accessToken => localStorage.setItem('accessToken', accessToken),
    handleError: err => {
      console.warn("Your refresh token is invalid. Please log in again.")
      console.error(err)
    }
  }),
  onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
  }),
  requestLink,
  new HttpLink({ uri: "http://localhost:5000/graphql", credentials: "include" })
])

export default link

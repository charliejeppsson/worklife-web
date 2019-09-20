import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
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

export const LOGIN_MUTATION = gql`
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

export const LOGOUT_MUTATION = gql`
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

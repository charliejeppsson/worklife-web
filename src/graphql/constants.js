import gql from 'graphql-tag'

export const CREATE_BOOKING = gql`
  mutation createBooking($date: Date!, $spaceId: ID!) {
    createBooking(date: $date, spaceId: $spaceId) {
      id
      date
      spaceId
      userId
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
      accessToken
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
      accessToken
    }
  }
`

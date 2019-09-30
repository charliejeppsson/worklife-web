import gql from 'graphql-tag'

// Bookings
export const CREATE_BOOKING = gql`
  mutation createBooking($date: Date!, $spaceId: ID!) {
    createBooking(date: $date, spaceId: $spaceId) {
      id
      date
      spaceId
      userId
export const CANCEL_BOOKING = gql`
  mutation cancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      success
    }
  }
`

export const MY_BOOKINGS = gql`
  query myBookings {
    myBookings {
      id
      date
      userId
      space {
        id
        name
        address
        city
        type
        capacity
        opensAt
        closesAt
        image {
          url
          info
        }
      }
    }
  }
`

// Auth
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

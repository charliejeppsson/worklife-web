import gql from 'graphql-tag'

export const CREATE_BOOKING = gql`
  mutation createBooking($date: Date!, $spaceId: ID!) {
    createBooking(date: $date, spaceId: $spaceId) {
      booking {
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
            id
            url
            info
          }
        }
      }
      message
      success
    }
  }
`

export const CANCEL_BOOKING = gql`
  mutation cancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      success
    }
  }
`

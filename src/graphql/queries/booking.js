import gql from 'graphql-tag'

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
          id
          url
          info
        }
      }
    }
  }
`

import gql from 'graphql-tag'

export const SEARCH_SPACES = gql`
  query searchSpaces($name: String, $date: Date!) {
    searchSpaces(name: $name, date: $date) {
      id
      name
      city
      address
      type
      capacity
      wifi
      coffee
      tea
      snacks
      meals
      opensAt
      closesAt
      availableSeats
      image {
        id
        url
        info
      }
    }
  }
`

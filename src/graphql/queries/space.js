import gql from 'graphql-tag'

export const SPACES = gql`
  query spaces {
    spaces {
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
      image {
        id
        url
        info
      }
    }
  }
`

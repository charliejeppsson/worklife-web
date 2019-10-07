import gql from 'graphql-tag'

export const BENEFITS = gql`
  query benefits {
    benefits {
      id
      title
      description
      company
      createdAt
      image {
        id
        url
        info
      }
    }
  }
`

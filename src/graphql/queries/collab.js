import gql from 'graphql-tag'

export const COLLABS = gql`
  query collabs {
    collabs {
      id
      title
      description
      duration
      compensation
      createdAt
      participants {
        id
        firstName
        lastName
        avatar
      }
      image {
        id
        url
        info
      }
      user {
        id
        firstName
        lastName
        title
        avatar
      }
    }
  }
`

export const COLLAB = gql`
  query collab($id: ID!) {
    collab(id: $id) {
      id
      title
      description
      duration
      compensation
      createdAt
      participants {
        id
        firstName
        lastName
        avatar
        title
      }
      image {
        id
        url
        info
      }
      user {
        id
        firstName
        lastName
        title
        avatar
      }
    }
  }
`

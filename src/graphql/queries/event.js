import gql from 'graphql-tag'

export const EVENTS = gql`
  query events {
    events {
      id
      title
      description
      startTime
      endTime
      createdAt
      attendants {
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
      space {
        id
        name
        address
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

export const EVENT = gql`
  query event($id: ID!) {  
    event(id: $id) {
      id
      title
      description
      startTime
      endTime
      createdAt
      space {
        id
        name
        address
      }
      attendants {
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

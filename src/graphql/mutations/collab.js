import gql from 'graphql-tag'

export const CREATE_COLLAB = gql`
  mutation createCollab(
    $title: String!,
    $description: String!,
    $duration: Int!,
    $compensation: Int!,
    $imageUrl: String!
  ) {
    createCollab(
      title: $title,
      description: $description,
      duration: $duration,
      compensation: $compensation,
      imageUrl: $imageUrl
    ) {
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

export const JOIN_COLLAB = gql`
  mutation joinCollab($id: ID!) {
    joinCollab(id: $id) {
      collab {
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
      message
      success
    }
  }
`

import gql from 'graphql-tag'

export const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!,
    $description: String!,
    $startTime: Date!,
    $endTime: Date!,
    $imageUrl: String!,
    $spaceId: ID!
  ) {
    createEvent(
      title: $title,
      description: $description,
      startTime: $startTime,
      endTime: $endTime,
      imageUrl: $imageUrl,
      spaceId: $spaceId
    ) {
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

export const ATTEND_EVENT = gql`
  mutation attendEvent($id: ID!) {
    attendEvent(id: $id) {
      event {
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
      message
      success
    }
  }
`

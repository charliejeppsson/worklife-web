import gql from 'graphql-tag'

export const NEWS_POSTS = gql`
  query newsPosts {
    newsPosts {
      id
      title
      description
      createdAt
      userId
      user {
        id
        firstName
        lastName
        title
        avatar
      }
      imageId
      image {
        id
        url
        info
      }
      eventId
      event {
        id
        title
        description
        startTime
        endTime
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
        }
      }
      collabId
      collab {
        id
        title
        description
        duration
        compensation
        participants {
          id
          firstName
          lastName
          avatar
        }
      }
    }
  }
`

export const NEWS_POST = gql`
  query newsPost($id: ID!) {
    newsPost(id: $id) {
      id
      title
      description
      content
      createdAt
      userId
      user {
        id
        firstName
        lastName
        title
        avatar
      }
      imageId
      image {
        id
        url
        info
      }
      eventId
      event {
        id
        title
        description
        startTime
        endTime
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
        }
      }
      collabId
      collab {
        id
        title
        description
        duration
        compensation
        participants {
          id
          firstName
          lastName
          avatar
        }
      }
    }
  }
`

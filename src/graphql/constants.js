import gql from 'graphql-tag'

// Collabs
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
        url
        info
      }
      user {
        firstName
        lastName
        title
        avatar
      }
    }
  }
`

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
        url
        info
      }
      user {
        firstName
        lastName
        title
        avatar
      }
    }
  }
`

// Bookings
export const CREATE_BOOKING = gql`
  mutation createBooking($date: Date!, $spaceId: ID!) {
    createBooking(date: $date, spaceId: $spaceId) {
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
          url
          info
        }
      }
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
          url
          info
        }
      }
    }
  }
`

// Events
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
        url
        info
      }
      space {
        name
        address
      }
      user {
        firstName
        lastName
        title
        avatar
      }
    }
  }
`

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
        url
        info
      }
      space {
        name
        address
      }
      user {
        firstName
        lastName
        title
        avatar
      }
    }
  }
`

// Spaces
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
        url
        info
      }
    }
  }
`

// Auth
export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
        title
        avatar
      }
      accessToken
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      user {
        id
        firstName
        lastName
        email
        title
        avatar
      }
      accessToken
    }
  }
`

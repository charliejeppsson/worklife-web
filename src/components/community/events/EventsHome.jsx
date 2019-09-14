import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import EventsList from './EventsList'

export default function EventsHome() {
  const { loading, error, data } = useQuery(gql`
    {
      events {
        id
        title
        description
        startTime
        endTime
        createdAt
        space {
          name
          address
        }
        attendances {
          user {
            id
            firstName
            lastName
            avatar
          }
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
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="body__container">
      <EventsList events={data.events} />
    </div>
  )
}

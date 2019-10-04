import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import EventsList from '../EventsList/EventsList'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './EventsHome.scss'

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
        user {
          firstName
          lastName
          title
          avatar
        }
      }
    }
  `)

  if (error) return <p>Error :(</p>

  return (
    <div className="EventsHome">
      {loading ? <LoadingSpinner /> : <EventsList events={data.events} />}
    </div>
  )
}
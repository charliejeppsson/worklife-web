import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import NewsList from './NewsList'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'

export default function NewsHome() {
  const { loading, error, data } = useQuery(gql`
    {
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
          url
          info
        }
        eventId
        event {
          title
          description
          startTime
          endTime
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
        }
        collabId
        collab {
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
  `)

  if (error) return <p>Error :(</p>

  return (
    <div className="body__container">
      {loading ? <LoadingSpinner /> : <NewsList newsPosts={data.newsPosts} />}
    </div>
  )
}

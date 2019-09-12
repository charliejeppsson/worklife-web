import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import NewsList from './NewsList'

export default function NewsHome() {
  const { loading, error, data } = useQuery(gql`
    {
      newsPosts {
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
          attendances {
            user {
              id
              firstName
              lastName
              avatar
            }
          }
        }
        collabId
        collab {
          title
          description
          duration
          compensation
          participations {
            user {
              id
              firstName
              lastName
              avatar
            }
          }
        }
      }
    }
  `)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="body__container">
      <NewsList newsPosts={data.newsPosts} />
    </div>
  )
}

import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import CollabsList from './CollabsList'

export default function CollabsHome() {
  const { loading, error, data } = useQuery(gql`
    {
      collabs {
        id
        title
        description
        duration
        compensation
        createdAt
        participations {
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

  console.log('DATA: ', data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="body__container">
      <CollabsList collabs={data.collabs} />
    </div>
  )
}

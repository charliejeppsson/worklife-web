import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import SpacesList from './SpacesList'
import LoadingSpinner from '../LoadingSpinner'

export default function SpacesHome() {
  const { loading, error, data } = useQuery(gql`
    {
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
  `)

  if (error) return <p>Error :(</p>

  return (
    <div className="body__container">
      {loading ? <LoadingSpinner /> : <SpacesList spaces={data.spaces} />}
    </div>
  )
}

import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import SpacesList from '../SpacesList/SpacesList'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import { SPACES } from '../../../graphql/queries/space'
import './SpacesHome.scss'

export default function SpacesHome() {
  const { loading, error, data } = useQuery(SPACES)

  if (error) return <p>Error :(</p>

  return (
    <div className="SpacesHome">
      {loading ? <LoadingSpinner /> : <SpacesList spaces={data.spaces} />}
    </div>
  )
}
